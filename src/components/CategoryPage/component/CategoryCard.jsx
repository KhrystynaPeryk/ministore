import React, {Component} from 'react';
import './CategoryCard.scss';

class CategoryCard extends Component {
  render() {
    return (
      <div className='card-container'>
        <div>
          <img className='card-container-image' src={this.props.image} alt={this.props.name} />
        </div>
        <div>
          <p>{this.props.name}</p>
          <p>{this.props.currencySymbol} {this.props.price}</p>
        </div>
      </div>
    )
  }
}

export default CategoryCard;