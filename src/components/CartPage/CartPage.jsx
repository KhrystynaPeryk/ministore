import React, {Component} from 'react';
import './CartPage.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartPageItem from './components/CartPageItem';

class CartPage extends Component {
  redirectToCheckout = () => {
    this.props.history.push({
      pathname: `/ministore/checkout`
    });
  }
  render() {
    const {
      cartModal,
      currency,
      cart,
      counter
    } = this.props
    let totalAmount = 0;
    return (
      <div className={cartModal ? 'cart-container dim-layer' : 'cart-container'}>
        <div className='cart-container-cart'>
          <h2 className='cart-container-title'>CART</h2>
          {cart.items.length === 0 ? (
            <h2>Your bag is empty...</h2>
          ) : (
            <div className='cart-container-items'>
              {cart.items.map((item, index5) => {
                const priceItem = item.itemToCart.prices.filter(price => {
                  return price.currency.symbol === currency
                })
                const price = priceItem[0].amount
                return <CartPageItem 
                  key={index5}
                  id={item.itemToCart.id}
                  cartId={item.itemToCart.cartId}
                  name={item.itemToCart.name}
                  brand={item.itemToCart.brand}
                  price={price}
                  photos={item.itemToCart.gallery}
                  allAttributes={item.itemToCart.allAttributes}
                  selectedAttributes={item.itemToCart.selectedAttributes}
                  qty={item.itemToCart.qty}
                />
              })}
            </div>
          )}
          <div className='cart-summary-container'>
            {cart.items.forEach((item) => {
              const priceItem = item.itemToCart.prices.filter(price => {
                return price.currency.symbol === currency
              })
              const price = priceItem[0].amount;
              totalAmount = totalAmount + price * item.itemToCart.qty;
            })}
            <div>Tax 21%: <span>{currency}{(totalAmount * 21 / 100).toFixed(2)}</span></div>
            <div>Quantity: <span>{counter}</span></div>
            <div>Total: <span>{currency}{totalAmount.toFixed(2)}</span></div>
          </div>
          <div className='cart-container-button'>
            {cart.items.length === 0 ? null : (
              <button className='order-button' onClick={() => this.redirectToCheckout()}>ORDER</button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
  cart: state.cart,
  counter: state.counter,
  cartModal: state.cartModal
});

export default withRouter(connect(mapStateToProps)(CartPage));