import React, {Component} from 'react';
import './CategoryCard.scss';

class CategoryCard extends Component {
  render() {
    return (
      <div className='card-container'>
        <div>{this.props.image}</div>
        <div>
          <p>{this.props.name}</p>
          <p>{this.props.price}</p>
        </div>
      </div>
    )
  }
}

export default CategoryCard;