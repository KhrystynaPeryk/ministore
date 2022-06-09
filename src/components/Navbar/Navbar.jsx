import React, {Component} from 'react';
import './Navbar.scss';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {ReactComponent as Cart} from '../../assets/cart.svg';

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <div className='navbar-container'>
          <ul>
            <li>CLOTHES</li>
            <li>TECH</li>
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