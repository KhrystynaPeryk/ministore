import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {ReactComponent as EmptyCart} from '../../../assets/emptyCart.svg'
import './CategoryCard.scss';
import { addAttributes, incrementCartCount, incrementProductQty } from '../../../redux/actions/actions';
import { fetchParams } from '../../../helpers/fetchParams';
import { getProduct } from '../../../queries/Queries';
import { v4 as uuidv4 } from 'uuid';

class CategoryCard extends Component {
  constructor() {
    super()
    this.state = {
      emptyCartShown: false,
    }
  }

  handleClick = (param) => {
    this.props.history.push({
      pathname: `/ministore/product/${this.props.id}`,
      state: param
    });
  }

  changingOpacityForOutOfStock = () => {
    if (!this.props.inStock && !this.props.cartModal) {
      return {'opacity': '0.5'}
    } 
    return null
  }

  handleAddToCart = () => {
    fetch('http://localhost:4000/', fetchParams(getProduct(this.props.id)))
    .then((response) => response.json())
    .then((res) => {
      return {
        attributes: res.data.product.attributes,
        prices: res.data.product.prices
      }
    })
    .then((attrAndPrices) => {
      const firstAttributeArray = attrAndPrices.attributes.map((attribute) => {
        return {[attribute.name] : attribute.items[0].value}
      });
      const newItemToCart = {
        id: this.props.id,
        cartId: uuidv4(),
        name: this.props.name,
        brand: this.props.brand,
        allAttributes: attrAndPrices.attributes,
        selectedAttributes: firstAttributeArray,
        qty: 1,
        gallery: this.props.gallery,
        prices: attrAndPrices.prices
      }
      if (this.props.cart.items.length === 0) {
        this.props.addAttributes(newItemToCart)
        this.props.incrementCartCount()
      } else {
        let isPresentInCart = this.props.cart.items.some((item) => {
          return item.itemToCart.id === this.props.id && JSON.stringify(item.itemToCart.selectedAttributes) === JSON.stringify(firstAttributeArray)
        })
        if (isPresentInCart) {
          this.props.incrementCartCount()
          return this.props.incrementProductQty(newItemToCart)
        } else {
          this.props.incrementCartCount()
          this.props.addAttributes(newItemToCart)
        }
      }
    })
  }

  render() {
    return (
        <div 
          className={this.props.inStock ? 'card-container' : 'card-container disabledCard'}
          style={this.changingOpacityForOutOfStock()}
          onMouseEnter={() => this.setState({emptyCartShown: true})}
          onMouseLeave={() => this.setState({emptyCartShown: false})}
          onClick={() => this.handleClick({ id: this.props.id })}
        >
          {
            this.state.emptyCartShown && this.props.inStock && (
              <div className='card-container-emptyCart' onClick={(e) => {
                e.stopPropagation()
                this.handleAddToCart()
              }}>
                <div className='emptyCart'>
                  <EmptyCart />
                </div>
              </div>
            )
          }
          <div>
            <img className={this.props.cartModal ? 'card-container-image dim-layer-image' : 'card-container-image'} src={this.props.image} alt={this.props.name} />
          </div>
          <div className='card-container-info'>
            <p className='card-container-name'>{this.props.brand} {this.props.name}</p>
            <p className='card-container-price'>{this.props.currencySymbol} {this.props.price}</p>
          </div>
        </div> 
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  cartModal: state.cartModal
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({addAttributes, incrementCartCount, incrementProductQty}, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryCard));
