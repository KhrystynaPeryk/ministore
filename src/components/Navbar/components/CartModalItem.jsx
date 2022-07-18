import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './CartModalItem.scss';
import { incrementProductQty, incrementCartCount, decrementProductQty, decrementCartCount, removeProduct } from '../../../redux/actions/actions';

class CartModalItem extends Component {
  handlePlus = () => {
    const newItemToCart = {
      id: this.props.id,
      selectedAttributes: this.props.selectedAttributes,
      qty: 0,
    }
    this.props.incrementCartCount()
    this.props.incrementProductQty(newItemToCart)
  }

  handleMinus = () => {
    if (this.props.qty > 1) {
      const thisItemFromCart = {
        id: this.props.id,
        selectedAttributes: this.props.selectedAttributes,
        qty: this.props.qty,
      }
      this.props.decrementCartCount()
      this.props.decrementProductQty(thisItemFromCart)
    } else {
      this.props.removeProduct(this.props.cartId)
      this.props.decrementCartCount()
    }
  }

  render() {
    let selectedAttributeValue;
    const {
      price,
      name,
      brand,
      currency,
      allAttributes,
      selectedAttributes,
      photo,
      qty
    } = this.props
    return (
        <div className='modal-item-container'>
          <div className='modal-item-info'>
            <div className='modal-item-info-brand'>{brand}</div>
            <div className='modal-item-info-name'>{name}</div>
            <div className='modal-item-info-price' >{currency} {price}</div>
            {allAttributes.length === 0 ? null : (
              allAttributes.map((attribute, index4) => {
                return (
                  <div key={index4} className='attributes-container'>
                    {selectedAttributes.forEach((selectedAttribute) => {
                      let selectedAttributeName = Object.keys(selectedAttribute)[0]
                      if (selectedAttributeName === attribute.name) {
                        selectedAttributeValue = Object.values(selectedAttribute)[0]
                        return selectedAttributeValue
                      }
                    })}
                    <div className='attributes-container-name'>{attribute.name}:</div>
                    <div className='square-item-container'>
                      {attribute.items.map((item, index3) => {
                        if (item.value === selectedAttributeValue) {
                          return (
                            <div key={index3}
                              style={item.value[0] === '#' ?
                                {
                                  backgroundColor: `${item.value}`,
                                  padding: '10px',
                                  border: '1px solid black',
                                  marginRight: '6%',
                                  boxShadow: '0px 0px 0px 2px #5ECE7B inset'
                                } : {
                                    border: '1px solid black',
                                    marginRight: '6%',
                                    padding: '2.5% 5%',
                                    color: 'white',
                                    backgroundColor: 'black'
                                  }
                              }
                            >
                              {item.value[0] === '#' ? null : item.value}
                            </div>                            
                          )
                        }
                        return (
                          <div key={index3}
                            style={item.value[0] === '#' ?
                              {
                                backgroundColor: `${item.value}`,
                                padding: '10px',
                                border: '1px solid black',
                                marginRight: '6%',
                              } : {
                                  border: '1px solid black',
                                  marginRight: '6%',
                                  padding: '2.5% 5%',
                                }
                            }
                          >
                            {item.value[0] === '#' ? null : item.value}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })
            )}
          </div>
          <div className='modal-item-photo'>
            <div className='modal-item-controls'>
              <div className='modal-item-controls-square' onClick={() => this.handlePlus()}>+</div>
              <div>{qty}</div>
              <div className='modal-item-controls-square' onClick={() => this.handleMinus()}>-</div>
            </div>
            <img className='photo' alt={name} src={photo}></img>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
  cart: state.cart,
  counter: state.counter
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({incrementCartCount, incrementProductQty, decrementCartCount, decrementProductQty, removeProduct}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModalItem);
