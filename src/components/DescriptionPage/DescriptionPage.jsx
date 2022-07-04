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
      console.log(res.data.product.prices)
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
    return {__html: this.state.description};
  }

  handleOnClick() {
    if (this.state.attributes.length === this.state.selectedAttributes.length) {
      console.log('add to cart: ', this.state.selectedAttributes)
    } else {
      alert('select all attributes')
    }
  }

  render() {
    const currentCurrency = this.props.currency;
    // creating an object to be able to update the same key-attributes with different values
    const obj = {};
    // creating a function that updates the above object if a user changes the selected attributes
    const updateSelectedItemsObj = (key, value) => {
      obj[key] = value;
    };
    return (
      <div className='product-container-page'>
        {this.state.allAttributesSelected && 'added to cart'}
        <div className='product-container'>
          <div className='product-container-photos'>
            <div className='all-photos'>
              {this.state.gallery.map((photo, index) => {
                return (
                  <div key={index} className='all-photos-container'>
                    <img 
                      className='all-photos-photo'
                      src={photo} alt={this.state.name + index}
                      onClick={() => this.setState({mainPhoto: photo})}>
                    </img>
                  </div>
                )
              })}
            </div>
            <div className='main-photo-container'>
              <img className='main-photo-photo' src={this.state.mainPhoto} alt={this.state.name}></img>
            </div>
          </div>
          <div className='product-container-info'>
            <div className='product-container-info-wrap'>
            <h2 className='product-container-info-brand'>{this.state.brand}</h2>
            <h2 className='product-container-info-name'>{this.state.name}</h2>
            {this.state.attributes.length === 0 ? null : (
              <div className='attributes'>
                {this.state.attributes.map((attribute, index) => {
                    return (
                        <div key={index} className='attributes-container'>
                            <div className='attributes-container-name'>{attribute.name.toUpperCase()}:</div>
                            <div className='square-item-container'>
                                {attribute.items.map((item, index1) => {
                                    return (
                                        <div key={index1} className={this.state.removedStyles ? null : 'square-item'}
                                            style={item.value[0] === '#' ? 
                                                {
                                                    backgroundColor: `${item.value}`,
                                                    padding: '3%',
                                                    border: '1px solid black',
                                                    marginRight: '1.5%',
                                                    fontSize: 'small',
                                                } 
                                                : {
                                                    border: '1px solid black',
                                                    marginRight: '1.5%',
                                                    padding: '1.5% 3%',
                                                    fontSize: 'small',
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
                                                console.log(obj)
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
                {this.state.prices.map((price, index) => {
                  if (price.currency.symbol === currentCurrency.currency) {
                    return (
                      <div className='product-container-info-amount' key={index}>{currentCurrency.currency}{price.amount}</div>
                    )
                  }
                  return null;
                })}
              </div>
            </div>
            <button className={this.state.inStock ? 'product-container-info-button' : 'product-container-info-button disabled'}
              disabled={!this.state.inStock}
              onClick={() => {
                // creating an array from the object of user's selected attributes
                const ArrayFromObj = Object.entries(obj).map(([key, value]) => ({ [key]: value }));
                //checking if all attributes are selected for a single product
                if (this.state.attributes.length === ArrayFromObj.length) {
                  const newItemToCart = {
                    id: this.state.id,
                    cartId: uuidv4(),
                    name: this.state.name,
                    brand: this.state.brand,
                    allAttributes: this.state.attributes,
                    selectedAttributes: ArrayFromObj,
                    qty: 1,
                    gallery: this.state.gallery,
                    prices: this.state.prices
                  }
                  // checking if the state cart  is empty
                  if (this.props.cart.items.length === 0) {
                    console.log('Empty cart - new newItemToCart at once', this.state.id);
                    this.props.addAttributes(newItemToCart)
                    this.props.incrementCartCount()
                  } else {
                    // checking if the state cart is not empty
                    console.log('Not empty cart - need to see newItemToCart', this.state.id)
                    let isPresentInCart = this.props.cart.items.some((item) => {
                      // checking if there is an item with the same id and the same array of user's selected attributes
                      return item.itemToCart.id === this.state.id && isEqualArraysOfObjs(item.itemToCart.selectedAttributes, ArrayFromObj)
                    })
                    console.log('isPresentInCart (the same id and selected attributes r same)', isPresentInCart)
                    if (isPresentInCart) {
                      this.props.incrementCartCount()
                      this.props.incrementProductQty(newItemToCart)
                    } else {
                      this.props.incrementCartCount()
                      this.props.addAttributes(newItemToCart)
                    }
                  }
                  // removing 'selected item
                  this.setState({removedStyles: !this.state.removedStyles})
                } else {
                  // if all the attributes of a single product are not selected
                  alert('Please, select all attributes')
                }
              }}
            >
              {this.state.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
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
  currency: state.currency,
  cart: state.cart,
  counter: state.counter
});

// const mapDispatchToProps = (dispatch) => ({ storeItemInCart: (item) => dispatch(addItemAttributes(item)) });
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({addAttributes, incrementCartCount, incrementProductQty}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionPage);
