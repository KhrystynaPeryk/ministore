import React, {Component} from 'react';
import './CategoryCard.scss';

class CategoryCard extends Component {
  render() {
    return (
      <div className='card-container'>
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