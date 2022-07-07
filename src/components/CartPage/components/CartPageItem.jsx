import React, { Component } from 'react';
import './CartPageItem.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementProductQty, incrementCartCount, decrementProductQty, decrementCartCount, removeProduct } from '../../../redux/actions/actions';

class CartPageItem extends Component {
    constructor() {
        super()
        this.state = {
            lengthOfPhotos: 0,
            currentPhotoIndex: 0
        }
    }
    componentDidMount = () => {
        this.setState({currentPhotoIndex: 0})
        this.setState({lengthOfPhotos: this.props.photos.length})
    }

    changeToNextPhoto = () => {
        if (this.state.currentPhotoIndex === this.state.lengthOfPhotos - 1) {
            this.setState({currentPhotoIndex: 0})
        } else {
            this.setState({currentPhotoIndex: this.state.currentPhotoIndex + 1})
        }
    }

    changeToPreviousPhoto = () => {
        if (this.state.currentPhotoIndex === 0) {
            this.setState({currentPhotoIndex: this.state.lengthOfPhotos - 1})
        } else {
            this.setState({currentPhotoIndex: this.state.currentPhotoIndex - 1})
        }
    }

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
        return (
                <div className='cart-item-container'>
                    <div className='cart-item-info'>
                        <div className='cart-item-info-brand'>{this.props.brand}</div>
                        <div className='cart-item-info-name'>{this.props.name}</div>
                        <div className='cart-item-info-price' >{this.props.currency.currency} {this.props.price}</div>
                        {this.props.allAttributes.length === 0 ? null : (
                        this.props.allAttributes.map((attribute, index4) => {
                            return (
                                <div key={index4} className='cart-attributes-container'>
                                    {this.props.selectedAttributes.forEach((selectedAttribute) => {
                                        let selectedAttributeName = Object.keys(selectedAttribute)[0]
                                        if (selectedAttributeName === attribute.name) {
                                            selectedAttributeValue = Object.values(selectedAttribute)[0]
                                            return selectedAttributeValue
                                        }
                                    })}
                                    <div className='cart-attributes-container-name'>{attribute.name.toUpperCase()}:</div>
                                    <div className='cart-square-item-container'>
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
                <div className='cart-item-photo'>
                    <div className='cart-item-controls'>
                        <div className='cart-item-controls-square' onClick={() => this.handlePlus()}>+</div>
                        <div>{this.props.qty}</div>
                        <div className='cart-item-controls-square' onClick={() => this.handleMinus()}>-</div>
                    </div>
                    <img className={this.props.cartModal ? 'cart-photo dim-layer-image' : 'cart-photo'} alt={this.props.name} src={this.props.photos[this.state.currentPhotoIndex]}></img>
                    {this.state.lengthOfPhotos === 1 ? null : (
                        <div className='cart-item-photo-arrows'>
                            <div className='cart-item-photo-arrows-square' onClick={() => this.changeToPreviousPhoto()}>&#60;</div>
                            <div className='cart-item-photo-arrows-square' onClick={() => this.changeToNextPhoto()}>&#62;</div>
                        </div>
                    )}
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

const mapDispatchToProps = (dispatch) => {
    return {
    ...bindActionCreators({incrementCartCount, incrementProductQty, decrementCartCount, decrementProductQty, removeProduct}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPageItem);