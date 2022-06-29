import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.scss';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {ReactComponent as Cart} from '../../assets/cart.svg';
import { GET_CATEGORIES, GET_CURRENCIES } from '../../queries/Queries';
import { fetchParams } from '../../helpers/fetchParams';
import Select from './components/Select';
import { connect } from 'react-redux';
import { itemsFetchData} from '../../redux/actions/actions';
import CartModal from './components/CartModal';

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      currencies: [],
      activeCategory: 0,
      isCartModalShown: true
    }
  }
  componentDidMount() {
    fetch('http://localhost:4000', fetchParams(GET_CATEGORIES))
    .then((response) => response.json())
    .then(categoryList => {
      this.setState({ categories: categoryList.data.categories });
    });

    fetch('http://localhost:4000', fetchParams(GET_CURRENCIES))
    .then((response) => response.json())
    .then(currencyList => {
      this.setState({ currencies: currencyList.data.currencies });
    });

    console.log('data for cart', this.props.cart.items)
    this.setState({countCart: this.props.cart.items.length})
  }

  render() {
    return (
      <nav className='navbar'>
        <div className='navbar-container'>
          <ul>
            {this.state.categories.map((category, index) => {
              return (
                <li 
                  key={index} 
                  className={index === this.state.activeCategory ? 'clicked-category' : ''}
                  onClick={(e) => {
                    this.setState({activeCategory: index})
                    return this.props.fetchData(category.name)
                  }}
                >
                  {category.name.toUpperCase()}
                </li>
              )
            })}
          </ul>
          <div className='navbar-container-logo'>
            <Link to='/ministore'>
              <Logo />
            </Link>
          </div>
          <div className='navbar-container-select'>
            <Select />
            <div className='navbar-container-cart' onClick={() => this.setState({isCartModalShown : !this.state.isCartModalShown})}>
              <Cart />
              {this.props.cart.items.length === 0 ? null : (
                <div className='navbar-container-counter'>
                  <div className='counter'> {this.props.counter} </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {this.state.isCartModalShown ? (
          <div className='cart-modal-container'>
            <CartModal />
          </div>
        ) : null}
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  category: state.products.category,
  cart: state.cart,
  counter: state.counter
  // hasErrored: state.productsHasErrored
});

const mapDispatchToProps = (dispatch) => ({ fetchData: (category) => dispatch(itemsFetchData(category)) });

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

// https://stackoverflow.com/questions/69014024/how-to-set-style-for-map-item-in-react-js