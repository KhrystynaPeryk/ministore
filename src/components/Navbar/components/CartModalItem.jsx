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
    console.log(this.props.allAttributes)
    return (
        <div className='modal-item-container'>
          <div className='modal-item-info'>
            <div>{this.props.brand}</div>
            <div>{this.props.name}</div>
            <div>{this.props.currency.currency} {this.props.price}</div>
            {this.props.allAttributes.length === 0 ? null : (
              this.props.allAttributes.map((attribute, index4) => {
                return (
                  <div key={index4} className='attributes-container'>
                    <div className='attributes-container-name'>{attribute.name.toUpperCase()}:</div>
                    <div className='square-item-container'>
                      {attribute.items.map((item, index3) => {
                        return (
                          <div key={index3} 
                            style={item.value[0] === '#' ?
                              {
                                backgroundColor: `${item.value}`,
                                padding: '3%',
                                border: '1px solid black',
                                marginRight: '1.5%',
                                fontSize: 'small',
                              } : {
                                  border: '1px solid black',
                                  marginRight: '1.5%',
                                  padding: '1.5% 3%',
                                  fontSize: 'small',
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
          <div className='modal-item-photos'>
            <div className='modal-item-controls'>

            </div>
            <img className='photo' alt={this.props.name} src={this.props.photo}></img>
          </div>
        </div>
    )
  }
}

            //   {this.state.attributes.length === 0 ? null : (
            //   <div className='attributes'>
            //     {this.state.attributes.map((attribute, index) => {
            //         return (
            //             <div key={index} className='attributes-container'>
            //                 <div className='attributes-container-name'>{attribute.name.toUpperCase()}:</div>
            //                 <div className='square-item-container'>
            //                     {attribute.items.map((item, index1) => {
            //                         return (
            //                             <div key={index1} className={this.state.removedStyles ? null : 'square-item'}
            //                                 style={item.value[0] === '#' ? 
            //                                     {
            //                                         backgroundColor: `${item.value}`,
            //                                         padding: '3%',
            //                                         border: '1px solid black',
            //                                         marginRight: '1.5%',
            //                                         fontSize: 'small',
            //                                     } 
            //                                     : {
            //                                         border: '1px solid black',
            //                                         marginRight: '1.5%',
            //                                         padding: '1.5% 3%',
            //                                         fontSize: 'small',
            //                                     } }
            //                                 onClick={(e) => {
            //                                     const siblingsArray = getSiblings(e.target);
            //                                     if (e.target.innerHTML) {
            //                                         siblingsArray.forEach(sibling => {
            //                                             if (sibling.classList.contains('clicked-text')) {
            //                                                 sibling.classList.remove('clicked-text')
            //                                             }
            //                                         })
            //                                         e.target.classList.add('clicked-text')
            //                                     } else {
            //                                         siblingsArray.forEach(sibling => {
            //                                             if (sibling.classList.contains('clicked-swatch')) {
            //                                                 sibling.classList.remove('clicked-swatch')
            //                                             }
            //                                         })
            //                                         e.target.classList.add('clicked-swatch')
            //                                     }
            //                                     updateSelectedItemsObj(attribute.name, item.value)
            //                                     console.log(obj)
            //                                 }}
            //                             >
            //                                 {item.value[0] === '#' ? null : item.value}
            //                             </div>
            //                         )
            //                     })}
            //                 </div>
            //             </div>
            //         )
            //     })}
            //   </div>
            // )}

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
