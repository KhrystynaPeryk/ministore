import React, {Component} from 'react';
import './CartModal.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addAttributes, incrementCartCount } from '../../../redux/actions/actions';
import CartModalItem from './CartModalItem';

class CartModal extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const currentCurrency = this.props.currency;
    return (
        <div className='modal-container'>
          <div className='modal-container-modal'>
            <p>
              <b>My Bag</b>, {this.props.counter} items
            </p>
            <div className='modal-container-items'>
              {this.props.cart.items.map((item, index5) => {
                const priceItem = item.itemToCart.prices.filter(price => {
                  return price.currency.symbol === currentCurrency.currency
                })
                const price = priceItem[0].amount
                return <CartModalItem 
                  key={index5}
                  id={item.itemToCart.id}
                  cartId={item.itemToCart.cartId}
                  name={item.itemToCart.name}
                  brand={item.itemToCart.brand}
                  price={price}
                  photo={item.itemToCart.gallery[0]}
                  allAttributes={item.itemToCart.allAttributes}
                  selectedAttributes={item.itemToCart.selectedAttributes}
                />
              })}
            </div>
            <div className='total-container'>
              <div>Total</div>
              <div></div>
            </div>
            <div className='modal-container-buttons'>
              <button className='button-bag'>VIEW BAG</button>
              <button className='button-checkout'>CHECKOUT</button>
            </div>
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

export default connect(mapStateToProps)(CartModal);