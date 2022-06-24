import React, {Component} from 'react';
import './DescriptionPage.scss';
import { fetchParams } from '../../helpers/fetchParams';
import { getProduct } from '../../queries/Queries';

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
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/', fetchParams(getProduct(this.props.location.state.id)))
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
      this.setState({brand: res.data.product.brand})
      this.setState({name: res.data.product.name})
      this.setState({gallery: res.data.product.gallery})
    })
  }
  render() {
    return (
      <div className='product-container-page'>
        <div className='product-container'>
          <div className='product-container-photos'>
            <div className='all-photos'>
              {this.state.gallery.map((photo, index) => {
                // console.log(photo)
                return (
                  <div key={index}>
                    <img src={photo} alt={this.state.name + index}></img>
                  </div>
                )
              })}
            </div>
            <div className='main-photo'>
              <img src={this.state.gallery[0]} alt={this.state.name}></img>
            </div>
          </div>
          <div className='product-container-info'>
            <h3>{this.state.name}</h3>
            <h4>{this.state.brand}</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default DescriptionPage;