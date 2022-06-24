import React, {Component} from 'react';
import './DescriptionPage.scss';
import { connect } from 'react-redux';
import { fetchParams } from '../../helpers/fetchParams';
import { getProduct } from '../../queries/Queries';
import Attributes from './components/Attributes';

class DescriptionPage extends Component {
    constructor() {
    super()
    this.state = {
      brand: '',
      name: '',
      gallery: [],
      inStock: true,
      prices: [],
      description: '',
      mainPhoto: '',
      attributes: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/', fetchParams(getProduct(this.props.location.state.id)))
    .then((response) => response.json())
    .then((res) => {
      console.log(res.data.product.prices)
      this.setState({brand: res.data.product.brand})
      this.setState({name: res.data.product.name})
      this.setState({gallery: res.data.product.gallery})
      this.setState({mainPhoto: res.data.product.gallery[0]})
      this.setState({attributes: res.data.product.attributes})
      this.setState({prices: res.data.product.prices})
      this.setState({description: res.data.product.description})
    })
  }

  createMarkup() {
    return {__html: this.state.description};
  }

  render() {
    const currentCurrency = this.props.currency;
    return (
      <div className='product-container-page'>
        <div className='product-container'>
          <div className='product-container-photos'>
            <div className='all-photos'>
              {this.state.gallery.map((photo, index) => {
                return (
                  <div key={index} className='all-photos-container'>
                    <img 
                      className='all-photos-photo'
                      src={photo} alt={this.state.name + index}
                      onClick={() => this.setState({mainPhoto: photo})}>
                    </img>
                  </div>
                )
              })}
            </div>
            <div className='main-photo-container'>
              <img className='main-photo-photo' src={this.state.mainPhoto} alt={this.state.name}></img>
            </div>
          </div>
          <div className='product-container-info'>
            <div className='product-container-info-wrap'>
            <h2 className='product-container-info-brand'>{this.state.brand}</h2>
            <h2 className='product-container-info-name'>{this.state.name}</h2>
            {this.state.attributes.length === 0 ? null : <Attributes attributes={this.state.attributes}/>}
            <div>
              <div className='product-container-info-price'>PRICE:</div>
              <div>
                {this.state.prices.map((price, index) => {
                  if (price.currency.symbol === currentCurrency.currency) {
                    return (
                      <div className='product-container-info-amount' key={index}>{currentCurrency.currency}{price.amount}</div>
                    )
                  }
                  return null;
                })}
              </div>
            </div>
            <button className='product-container-info-button'>ADD TO CART</button>
            <div className='product-container-info-description' dangerouslySetInnerHTML={this.createMarkup()}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency
});

export default connect(mapStateToProps)(DescriptionPage);