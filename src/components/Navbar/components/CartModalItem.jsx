import React, {Component} from 'react';
import { connect } from 'react-redux';
import './CartModalItem.scss';

class CartModalItem extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
        <div className='modal-item-container'>
         <div className='modal-item-info'>
          <div>{this.props.brand}</div>
          <div>{this.props.name}</div>
          <div>{this.props.currency.currency} {this.props.price}</div>
         </div>
        <div className='modal-item-controls'>

        </div>
         <div className='modal-item-photos'>
          <img className='photo' alt={this.props.name} src={this.props.photo}></img>
         </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
  cart: state.cart,
  counter: state.counter
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     ...bindActionCreators({addAttributes, incrementCartCount}, dispatch)
//   }
// }

export default connect(mapStateToProps)(CartModalItem);
