import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.scss';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {ReactComponent as Cart} from '../../assets/cart.svg';
import { GET_CATEGORIES, GET_CURRENCIES } from '../../queries/Queries';
import { fetchParams } from '../../helpers/fetchParams';
import Select from './components/Select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { itemsFetchData, openMinicart, closeMinicart, fetchCategory } from '../../redux/actions/actions';
import CartModal from './components/CartModal';

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      currencies: [],
      activeCategory: 0,
    }
    this.modalBox = React.createRef();
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

    document.addEventListener('mousedown', this.handleOutsideClickModal);
  }

  handleMiniCartModal = () => {
    if (this.props.cartModal) {
      return this.props.closeMinicart()
    }
    return this.props.openMinicart()
  }

  handleOutsideClickModal = (event) => {
    if (this.modalBox && !this.modalBox?.current?.contains(event.target)) {
      this.props.closeMinicart()
    } else {
      this.props.openMinicart()
    }
  }

  render() {
    const {
      cart,
      counter,
      cartModal
    } = this.props
    return (
      <nav className='navbar'>
        <div className='navbar-container'>
          <ul>
            {this.state.categories.map((category, index) => {
              return (
                <Link 
                  to='/ministore' 
                  key={index} 
                  style={{textDecoration : 'inherit', color: 'inherit'}}
                >
                  <li
                    className={index === this.state.activeCategory ? 'clicked-category' : ''}
                    onClick={() => {
                      this.setState({activeCategory: index})
                      this.props.fetchCategory(category.name)
                      return this.props.itemsFetchData(category.name)
                    }}
                  >
                    {category.name.toUpperCase()}
                  </li>
                </Link>
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
            <div className='navbar-container-cart' onClick={() => this.handleMiniCartModal()}>
              <Cart />
              {cart.items.length === 0 ? null : (
                <div className='navbar-container-counter'>
                  <div className='counter'> {counter} </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {cartModal ? (
          <div ref={this.modalBox}>
            <CartModal />
          </div>
        ) : null}
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  category: state.category.category,
  cart: state.cart,
  counter: state.counter,
  cartModal: state.cartModal
});

const mapDispatchToProps = (dispatch) => {
    return {
    ...bindActionCreators({itemsFetchData, openMinicart, closeMinicart, fetchCategory}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);