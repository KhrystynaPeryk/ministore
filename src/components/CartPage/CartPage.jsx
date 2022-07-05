import React, {Component} from 'react';
import './CartPage.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartPageItem from './components/CartPageItem';

// import { bindActionCreators } from 'redux';

class CartPage extends Component {
  render() {
    const currentCurrency = this.props.currency;
    let totalAmount = 0;
    return (
      <div className='cart-container'>
        <div className='cart-container-cart'>
          <h2>CART</h2>
          <hr></hr>
          <div className='cart-container-items'>
            {this.props.cart.items.map((item, index5) => {
              const priceItem = item.itemToCart.prices.filter(price => {
                return price.currency.symbol === currentCurrency.currency
              })
              const price = priceItem[0].amount
              return <CartPageItem 
                key={index5}
                id={item.itemToCart.id}
                cartId={item.itemToCart.cartId}
                name={item.itemToCart.name}
                brand={item.itemToCart.brand}
                price={price}
                photo={item.itemToCart.gallery[0]}
                allAttributes={item.itemToCart.allAttributes}
                selectedAttributes={item.itemToCart.selectedAttributes}
                qty={item.itemToCart.qty}
              />
            })}
          </div>
          <div className='cart-summary-container'>
            {this.props.cart.items.forEach((item) => {
              const priceItem = item.itemToCart.prices.filter(price => {
                return price.currency.symbol === currentCurrency.currency
              })
              const price = priceItem[0].amount;
              totalAmount = totalAmount + price * item.itemToCart.qty;
            })}
            <div>Tax 21%: {currentCurrency.currency}{(totalAmount * 21 / 100).toFixed(2)}</div>
            <div>Quantity: {this.props.counter}</div>
            <div>Total: {currentCurrency.currency}{totalAmount.toFixed(2)}</div>
          </div>
          <div className='cart-container-button'>
            <button className='order' onClick={() => this.redirectToCart()}>ORDER</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
  cart: state.cart,
  counter: state.counter,
  cartModal: state.cartModal
});

// const mapDispatchToProps = (dispatch) => {
//     return {
//     ...bindActionCreators({}, dispatch)
//   }
// }

export default withRouter(connect(mapStateToProps)(CartPage));