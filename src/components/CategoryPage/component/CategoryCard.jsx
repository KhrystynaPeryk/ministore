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
      pathname: `/ministore/product`,
      state: param
    });
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
        if (attrAndPrices.attributes.length === 0) {
          console.log('attributes array equals zero')
          const itemToCart = {
            id: this.props.id,
            cartId: uuidv4(),
            name: this.props.name,
            brand: this.props.brand,
            allAttributes: attrAndPrices.attributes,
            selectedAttributes: [],
            qty: 1,
            gallery: this.props.gallery,
            prices: attrAndPrices.prices
          }
          this.props.addAttributes(itemToCart)
        } else {
          // console.log('attributes array something')
          // console.log(attrAndPrices.attributes)
          const firstAttributeArray = attrAndPrices.attributes.map((attribute) => {
            return {[attribute.name] : attribute.items[0].value}
          })
          console.log('firstAttributeArray', firstAttributeArray)

          if (this.props.cart.items.length === 0) {
            console.log('when the cart array is empty in the beginning')
            const itemToCart = {
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
                console.log('itemToCart', itemToCart)
                this.props.addAttributes(itemToCart)
          } else {
            console.log('when the cart array is NOT empty')
            this.props.cart.items.forEach(item => {
            if (item.itemToCart.id === this.props.id) {
              console.log('if there is the same ID in the cart array')
              if (JSON.stringify(item.itemToCart.selectedAttributes) === JSON.stringify(firstAttributeArray)) {
                console.log('if there is the same ID in the array and the same attributes array')
                const itemToCart = {
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
                console.log('itemToCart', itemToCart)
                // this.props.addAttributes(itemToCart)


                // logic to increment qty of the products with same attributes
                this.props.incrementProductQty(itemToCart)
                console.log(`/////the same id ${this.props.id} with same attributes: ${firstAttributeArray}`)
              } else {
                console.log('if there is the same ID but different attributes array')
                const itemToCart = {
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
                console.log('itemToCart', itemToCart)
                this.props.addAttributes(itemToCart)
              }
            } else {
              console.log('if there is no same ID in the cart array')
              const itemToCart = {
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
              console.log('itemToCart', itemToCart)
              this.props.addAttributes(itemToCart)
            }
          })}
        }
        this.props.incrementCartCount()
    })
  }

  render() {
    return (
        <div 
          className={this.props.inStock ? 'card-container' : 'card-container disabledCard'}
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
            <img className='card-container-image' src={this.props.image} alt={this.props.name} />
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
  cart: state.cart
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({addAttributes, incrementCartCount, incrementProductQty}, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryCard));
