import React, {Component} from 'react';
import { connect } from 'react-redux';
import './CartModalItem.scss';

class CartModalItem extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    let selectedAttributeValue;
    return (
        <div className='modal-item-container'>
          <div className='modal-item-info'>
            <div className='modal-item-info-brand'>{this.props.brand}</div>
            <div className='modal-item-info-name'>{this.props.name}</div>
            <div className='modal-item-info-price' >{this.props.currency.currency} {this.props.price}</div>
            {/* {this.props.allAttributes.length === 0 ? null : (
              this.props.allAttributes.map((attribute, index4) => {
                return (
                  <div key={index4} className='attributes-container'>
                    <div className='attributes-container-name'>{attribute.name}:</div>
                    <div className='square-item-container'>
                      {attribute.items.map((item, index3) => {
                        console.log('single attribute item', item)
                        return (
                          <div key={index3}
                            style={item.value[0] === '#' ?
                              {
                                backgroundColor: `${item.value}`,
                                padding: '8%',
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
            )} */}



            {this.props.allAttributes.length === 0 ? null : (
              this.props.allAttributes.map((attribute, index4) => {
                return (
                  <div key={index4} className='attributes-container'>
                    {this.props.selectedAttributes.forEach((selectedAttribute) => {
                      let selectedAttributeName = Object.keys(selectedAttribute)[0]
                      if (selectedAttributeName === attribute.name) {
                        selectedAttributeValue = Object.values(selectedAttribute)[0]
                        console.log('name and value', attribute.name, selectedAttributeValue)
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
                                  padding: '8%',
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
                                padding: '8%',
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
              <div className='modal-item-controls-square'>+</div>
              <div>{this.props.qty}</div>
              <div className='modal-item-controls-square'>-</div>
            </div>
            <img className='photo' alt={this.props.name} src={this.props.photo}></img>
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

export default connect(mapStateToProps)(CartModalItem);
