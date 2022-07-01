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
            <div className='modal-item-info-brand'>{this.props.brand}</div>
            <div className='modal-item-info-name'>{this.props.name}</div>
            <div className='modal-item-info-price' >{this.props.currency.currency} {this.props.price}</div>
            {this.props.allAttributes.length === 0 ? null : (
              this.props.allAttributes.map((attribute, index4) => {
                return (
                  <div key={index4} className='attributes-container'>
                    <div className='attributes-container-name'>{attribute.name}:</div>
                    <div className='square-item-container'>
                      {attribute.items.map((item, index3) => {
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
              <div></div>
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

// to play with
let cartItems = [
  {
    id: 'phone',
    selectedAttributes: [{Capacity: '512G'}, {Color: '#0000'}]
  },
  {
    id: 'phone',
    selectedAttributes: [{Capacity: '1T'}, {Color: '#12ee32'}]
  },
  {
    id: 'phone',
    selectedAttributes: [{Capacity: '512G'}, {Color: '#12ee32'}]
  },
  {
    id: 'phone',
    selectedAttributes: [{Capacity: '512G'}, {Color: '#0000'}]
  },
  {
    id: 'phone',
    selectedAttributes: [{Capacity: '512G'}, {Color: '#0000'}]
  },
  {
    id: 'phone',
    selectedAttributes: [{Capacity: '1T'}, {Color: '#12ee32'}]
  },
  {
    id: 'shoes',
    selectedAttributes: [{Size: '41'}]
  },
    {
    id: 'shoes',
    selectedAttributes: [{Size: '41'}]
  },
  {
    id: 'shoes',
    selectedAttributes: [{Size: '42'}]
  },
  {
    id: 'airpods',
    selectedAttributes: []
  }
]

function modifyArray() {
  cartItems.map(item => {

  })
}