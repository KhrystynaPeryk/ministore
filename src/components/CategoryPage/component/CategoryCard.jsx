import React, {Component} from 'react';
import {ReactComponent as EmptyCart} from '../../../assets/emptyCart.svg'
import './CategoryCard.scss';

class CategoryCard extends Component {
    constructor() {
    super()
    this.state = {
      emptyCartShown: false,
    }
  }
  render() {
    return (
      <div 
        className='card-container' 
        onMouseEnter={() => this.setState({emptyCartShown: true})}
        onMouseLeave={() => this.setState({emptyCartShown: false})}
      >
        {
          this.state.emptyCartShown && (
            <div className='card-container-emptyCart' onClick={() => console.log(this.props.name)}>
              <div className='emptyCart'><EmptyCart /></div>
            </div>
          )
        }
        <div>
          <img className='card-container-image' src={this.props.image} alt={this.props.name} />
        </div>
        <div className='card-container-info'>
          <p className='card-container-name'>{this.props.name}</p>
          <p className='card-container-price'>{this.props.currencySymbol} {this.props.price}</p>
        </div>
      </div>
    )
  }
}

export default CategoryCard;