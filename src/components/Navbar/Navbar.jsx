import React, {Component} from 'react';
import './Navbar.scss';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {ReactComponent as Cart} from '../../assets/cart.svg';
import { GET_CATEGORIES, GET_CURRENCIES } from '../../GraphQL/Queries';

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      categories: []
    }
  }
  componentDidMount() {
    fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(GET_CATEGORIES)
    })
    .then((response) => response.json())
    .then(categoryList => {
      this.setState({ categories: categoryList.data.categories });
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
            <Logo />
          </div>
          <div className='navbar-container-right'>
            <select name='currency' id='currency'>
              <option value='$'>$</option>
              <option value='$'>Euro</option>
              <option value='$'>Rub</option>
            </select>
            <span>
              <Cart />
            </span>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;