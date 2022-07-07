import React, {Component} from 'react';
import './CartPage.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartPageItem from './components/CartPageItem';

class CartPage extends Component {
  render() {
    const currentCurrency = this.props.currency;
    let totalAmount = 0;
    return (
      <div className={this.props.cartModal ? 'cart-container dim-layer' : 'cart-container'}>
        <div className='cart-container-cart'>
          <h2 className='cart-container-title'>CART</h2>
          {this.props.cart.items.length === 0 ? (
            <h2>Your bag is empty...</h2>
          ) : (
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
                  photos={item.itemToCart.gallery}
                  allAttributes={item.itemToCart.allAttributes}
                  selectedAttributes={item.itemToCart.selectedAttributes}
                  qty={item.itemToCart.qty}
                />
              })}
            </div>
          )}
          <div className='cart-summary-container'>
            {this.props.cart.items.forEach((item) => {
              const priceItem = item.itemToCart.prices.filter(price => {
                return price.currency.symbol === currentCurrency.currency
              })
              const price = priceItem[0].amount;
              totalAmount = totalAmount + price * item.itemToCart.qty;
            })}
            <div>Tax 21%: <span>{currentCurrency.currency}{(totalAmount * 21 / 100).toFixed(2)}</span></div>
            <div>Quantity: <span>{this.props.counter}</span></div>
            <div>Total: <span>{currentCurrency.currency}{totalAmount.toFixed(2)}</span></div>
          </div>
          <div className='cart-container-button'>
            {this.props.cart.items.length === 0 ? null : (
              <button className='order-button' onClick={() => this.redirectToCart()}>ORDER</button>
            )}
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

export default withRouter(connect(mapStateToProps)(CartPage));