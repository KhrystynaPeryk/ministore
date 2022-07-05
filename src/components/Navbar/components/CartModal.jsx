import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './CartModal.scss';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { addAttributes, incrementCartCount } from '../../../redux/actions/actions';
import CartModalItem from './CartModalItem';

class CartModal extends Component {
  constructor() {
    super()
    this.state = {
      redirectToCart: false,
    }
  }
  redirectToCart = () => {
    this.setState({redirectToCart : !this.state.redirectToCart})
    // this.props.history.push({
    //   pathname: `/ministore/cart`
    // });
  }

  render() {
    const currentCurrency = this.props.currency;
    let totalAmount = 0;
    if (this.state.redirectToCart) {
      return <Redirect to={{pathname: '/ministore/cart'}}/>
    }
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
                  qty={item.itemToCart.qty}
                />
              })}
            </div>
            <div className='total-container'>
              <div>Total</div>
              {this.props.cart.items.forEach((item) => {
                const priceItem = item.itemToCart.prices.filter(price => {
                  return price.currency.symbol === currentCurrency.currency
                })
                const price = priceItem[0].amount;
                totalAmount = totalAmount + price * item.itemToCart.qty;
              })}
              <div>{currentCurrency.currency}{totalAmount.toFixed(2)}</div>
            </div>
            <div className='modal-container-buttons'>
              <button className='button-bag' onClick={() => this.redirectToCart()}>VIEW BAG</button>
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

export default withRouter(connect(mapStateToProps)(CartModal));