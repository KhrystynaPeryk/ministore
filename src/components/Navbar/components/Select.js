import React, {Component} from 'react';
import './Select.scss';
import { GET_CURRENCIES } from '../../../queries/Queries';
import { fetchParams } from '../../../helpers/fetchParams';

class Select extends Component {
  constructor() {
    super()
    this.state = {
      currencies: [],
      isDropdownOpen: false,
      currency: '$'
    }
  }
  componentDidMount() {
    fetch('http://localhost:4000', fetchParams(GET_CURRENCIES))
    .then((response) => response.json())
    .then(currencyList => {
      this.setState({ currencies: currencyList.data.currencies });
    });
  }

  handleDropdown() {
    this.setState({isDropdownOpen: !this.state.isDropdownOpen})
  }

  handleCurrencyChange(e) {
    this.setState({currency: e.target.innerHTML.split(' ')[0]})
  }

  render() {
    return (
        <div className='select-container' onClick={() => this.handleDropdown()}>
          <div>{this.state.currency} {this.state.isDropdownOpen ? <span className='select-container-arrow'>&#710;</span> : <span className='select-container-arrow'>&#711;</span> }</div>
          {this.state.isDropdownOpen ? (
            <div className='select-container-dropdown'>
              {this.state.currencies.map((currency, index) => {
                return (
                  <div className='select-container-dropdown-option' key={index} onClick={(e) => this.handleCurrencyChange(e)}>{currency.symbol} {currency.label}</div>
                )
            })}
            </div>
          ) : null}
        </div>
    )
  }
}

export default Select;