import React, {Component} from 'react';
import './DescriptionPage.scss';
import { connect } from 'react-redux';
import { fetchParams } from '../../helpers/fetchParams';
import { getProduct } from '../../queries/Queries';
import { getSiblings } from '../../helpers/getSiblingDOMElements';
import { incrementCartCount, addAttributes, incrementProductQty } from '../../redux/actions/actions';
import { bindActionCreators } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { isEqualArraysOfObjs } from '../../helpers/isEqualArrayOfObjs';
import DOMPurify from 'dompurify';

class DescriptionPage extends Component {
    constructor() {
    super()
    this.state = {
      brand: '',
      name: '',
      gallery: [],
      inStock: true,
      prices: [],
      description: '',
      mainPhoto: '',
      attributes: [],
      id: '',
      removedStyles: false
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/', fetchParams(getProduct(this.props.location.state.id)))
    .then((response) => response.json())
    .then((res) => {
      this.setState({brand: res.data.product.brand})
      this.setState({name: res.data.product.name})
      this.setState({gallery: res.data.product.gallery})
      this.setState({mainPhoto: res.data.product.gallery[0]})
      this.setState({attributes: res.data.product.attributes})
      this.setState({prices: res.data.product.prices})
      this.setState({description: res.data.product.description})
      this.setState({inStock: res.data.product.inStock})
      this.setState({id: res.data.product.id})
    })
  }

  createMarkup() {
    return {__html: DOMPurify.sanitize(this.state.description)};
  }

  changingOpacityForOutOfStock = () => {
    if (!this.state.inStock && !this.props.cartModal) {
      return {'opacity': '0.5'}
    } 
    return null
  }

  render() {
    const {
      currency,
      cartModal,
      cart
    } = this.props
    const {
      allAttributesSelected,
      gallery,
      name,
      inStock,
      brand,
      attributes,
      mainPhoto,
      removedStyles,
      prices,
      id
    } = this.state
    // creating an object to be able to update the same key-attributes with different values
    const obj = {};
    // creating a function that updates the above object if a user changes the selected attributes
    const updateSelectedItemsObj = (key, value) => {
      obj[key] = value;
    };
    return (
      <div className={cartModal ? 'product-container-page dim-layer' : 'product-container-page'}>
        {allAttributesSelected && 'added to cart'}
        <div className='product-container'>
          <div className='product-container-photos'>
            <div className='all-photos'>
              {gallery.map((photo, index) => {
                return (
                  <div key={index} className='all-photos-container'>
                    <img 
                      className={cartModal ? 'all-photos-photo dim-layer-image' : 'all-photos-photo'}
                      src={photo} alt={name + index}
                      onClick={() => this.setState({mainPhoto: photo})}>
                    </img>
                  </div>
                )
              })}
            </div>
            <div 
              className={inStock ? 'main-photo-container' : 'main-photo-container disabledCardDesc'}
              style={this.changingOpacityForOutOfStock()}
            >
              <img className={cartModal ? 'main-photo-photo dim-layer-image' : 'main-photo-photo'} src={mainPhoto} alt={name}></img>
            </div>
          </div>
          <div className='product-container-info'>
            <div className='product-container-info-wrap'>
            <h2 className='product-container-info-brand'>{brand}</h2>
            <h2 className='product-container-info-name'>{name}</h2>
            {attributes.length === 0 ? null : (
              <div className='attributes'>
                {attributes.map((attribute, index) => {
                    return (
                        <div key={index} className='attributes-container'>
                            <div className='attributes-container-name'>{attribute.name.toUpperCase()}:</div>
                            <div className='square-item-container'>
                                {attribute.items.map((item, index1) => {
                                    return (
                                        <div key={index1} className={removedStyles ? null : 'square-item'}
                                            style={item.value[0] === '#' ? 
                                                {
                                                    backgroundColor: `${item.value}`,
                                                    padding: '14px',
                                                    border: '1px solid black',
                                                    marginRight: '1.5%',
                                                    fontSize: 'medium',
                                                } 
                                                : {
                                                    border: '1px solid black',
                                                    marginRight: '1.5%',
                                                    padding: '4px 8px',
                                                    fontSize: 'medium',
                                                } }
                                            onClick={(e) => {
                                              // a logic below is to check sibling DOM elements of products attributes' values and to change the styles accordingly
                                                const siblingsArray = getSiblings(e.target);
                                                if (e.target.innerHTML) {
                                                    siblingsArray.forEach(sibling => {
                                                        if (sibling.classList.contains('clicked-text')) {
                                                            sibling.classList.remove('clicked-text')
                                                        }
                                                    })
                                                    e.target.classList.add('clicked-text')
                                                } else {
                                                    siblingsArray.forEach(sibling => {
                                                        if (sibling.classList.contains('clicked-swatch')) {
                                                            sibling.classList.remove('clicked-swatch')
                                                        }
                                                    })
                                                    e.target.classList.add('clicked-swatch')
                                                }
                                                updateSelectedItemsObj(attribute.name, item.value)
                                            }}
                                        >
                                            {item.value[0] === '#' ? null : item.value}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
              </div>
            )}
            <div>
              <div className='product-container-info-price'>PRICE:</div>
              <div>
                {prices.map((price, index) => {
                  if (price.currency.symbol === currency) {
                    return (
                      <div className='product-container-info-amount' key={index}>{currency}{price.amount}</div>
                    )
                  }
                  return null;
                })}
              </div>
            </div>
            <button className={inStock ? 'product-container-info-button' : 'product-container-info-button disabled'}
              disabled={!inStock}
              onClick={() => {
                // creating an array from the object of user's selected attributes
                const ArrayFromObj = Object.entries(obj).map(([key, value]) => ({ [key]: value }));
                //checking if all attributes are selected for a single product
                if (attributes.length === ArrayFromObj.length) {
                  const newItemToCart = {
                    id,
                    cartId: uuidv4(),
                    name,
                    brand,
                    allAttributes: attributes,
                    selectedAttributes: ArrayFromObj,
                    qty: 1,
                    gallery,
                    prices
                  }
                  // checking if the state cart  is empty
                  if (cart.items.length === 0) {
                    this.props.addAttributes(newItemToCart)
                    this.props.incrementCartCount()
                  } else {
                    // checking if the state cart is not empty
                    let isPresentInCart = cart.items.some((item) => {
                      // checking if there is an item with the same id and the same array of user's selected attributes
                      return item.itemToCart.id === id && isEqualArraysOfObjs(item.itemToCart.selectedAttributes, ArrayFromObj)
                    })
                    if (isPresentInCart) {
                      this.props.incrementCartCount()
                      this.props.incrementProductQty(newItemToCart)
                    } else {
                      this.props.incrementCartCount()
                      this.props.addAttributes(newItemToCart)
                    }
                  }
                  // removing 'selected item
                  this.setState({removedStyles: !removedStyles})
                } else {
                  // if all the attributes of a single product are not selected
                  alert('Please select all attributes of a product')
                }
              }}
            >
              {inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
            </button>
            <div className='product-container-info-description' dangerouslySetInnerHTML={this.createMarkup()}></div>
            </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({addAttributes, incrementCartCount, incrementProductQty}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionPage);
