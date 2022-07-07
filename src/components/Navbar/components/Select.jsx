import React, {Component} from 'react';
import './Select.scss';
import { GET_CURRENCIES } from '../../../queries/Queries';
import { fetchParams } from '../../../helpers/fetchParams';
import { connect } from 'react-redux';
import { fetchCurrentCurrency } from '../../../redux/actions/actions';

class Select extends Component {
  constructor() {
    super()
    this.state = {
      currencies: [],
      isDropdownOpen: false,
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

  render() {
    return (
        <div className='select-container' onClick={() => this.handleDropdown()}>
          <div>{this.props.currency} {this.state.isDropdownOpen ?  
            <span className='select-container-arrow'>&#710;</span> : 
            <span className='select-container-arrow'>&#711;</span> }
          </div>
          {this.state.isDropdownOpen ? (
            <div className='select-container-dropdown'>
              {this.state.currencies.map((currency, index) => {
                return (
                <div className='select-container-dropdown-option' key={index} onClick={() => {
                  this.props.fetchCurrency(currency.symbol)
                }}>{currency.symbol} {currency.label}</div>
                )
            })}
            </div>
          ) : null}
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency
});

const mapDispatchToProps = (dispatch) => ({ fetchCurrency : (currency) => dispatch(fetchCurrentCurrency(currency)) });

export default connect(mapStateToProps, mapDispatchToProps)(Select);