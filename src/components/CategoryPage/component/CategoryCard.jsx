import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {ReactComponent as EmptyCart} from '../../../assets/emptyCart.svg'
import './CategoryCard.scss';

class CategoryCard extends Component {
    constructor() {
    super()
    this.state = {
      emptyCartShown: false,
    }
  }

  handleClick = (param) => {
    this.props.history.push({
      pathname: `/ministore/product`,
      state: param
    });
  }

  render() {
    return (
        <div 
          className='card-container' 
          onMouseEnter={() => this.setState({emptyCartShown: true})}
          onMouseLeave={() => this.setState({emptyCartShown: false})}
          onClick={() => this.handleClick({ id: this.props.id })}
        >
          {
            this.state.emptyCartShown && (
              <div className='card-container-emptyCart' onClick={() => console.log(this.props.id)}>
                <div className='emptyCart'><EmptyCart /></div>
              </div>
            )
          }
          <div>
            <img className='card-container-image' src={this.props.image} alt={this.props.name} />
          </div>
          <div className='card-container-info'>
            <p className='card-container-name'>{this.props.brand} {this.props.name}</p>
            <p className='card-container-price'>{this.props.currencySymbol} {this.props.price}</p>
          </div>
        </div> 
    )
  }
}

export default withRouter(CategoryCard);