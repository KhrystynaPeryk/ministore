import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.scss';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {ReactComponent as Cart} from '../../assets/cart.svg';
import { GET_CATEGORIES, GET_CURRENCIES } from '../../queries/Queries';
import { fetchParams } from '../../helpers/fetchParams';
import Select from './components/Select';

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      currencies: [],
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

  }

  render() {
    return (
      <nav className='navbar'>
        <div className='navbar-container'>
          <ul>
            {this.state.categories.map((category, index) => {
              return (
                <li key={index}>{category.name.toUpperCase()}</li>
              )
            })}
          </ul>
          <div className='navbar-container-logo'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <div className='navbar-container-select'>
            <Select />
            <div className='navbar-container-cart'>
              <Link to='/cart'>
                <Cart />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;