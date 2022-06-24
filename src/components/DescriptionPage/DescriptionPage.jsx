import React, {Component} from 'react';
import './DescriptionPage.scss';
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
      console.log(res.data.product.attributes)
      this.setState({brand: res.data.product.brand})
      this.setState({name: res.data.product.name})
      this.setState({gallery: res.data.product.gallery})
      this.setState({mainPhoto: res.data.product.gallery[0]})
      this.setState({attributes: res.data.product.attributes})
    })
  }

  render() {
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
            <h3>{this.state.brand}</h3>
            <h4>{this.state.name}</h4>
            {this.state.attributes.length === 0 ? null : <Attributes attributes={this.state.attributes}/>}
          </div>
        </div>
      </div>
    )
  }
}

export default DescriptionPage;