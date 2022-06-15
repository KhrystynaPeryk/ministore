import React, {Component} from 'react';
import './CategoryPage.scss';
import { getProducts } from '../../queries/Queries';
import { fetchParams } from '../../helpers/fetchParams';
import CategoryCard from './component/CategoryCard';

const mockedSymbol = '$'

class CategoryPage extends Component {
  constructor() {
    super()
    this.state = {
      products : []
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000', fetchParams(getProducts("all")))
    .then((response) => response.json())
    .then(productList => {
      console.log(productList)
      this.setState({ products: productList.data.category.products });
    });
  }

  render() {
    return (
      <div className='category-page-container'>
        <div className='category-container'>
          <h1>CategoryPage</h1>
          <div className='category-container-cards'>
            {this.state.products.map((product) => {
              const priceItem = product.prices.filter(price => {
                return price.currency.symbol === mockedSymbol
              })
              const price = priceItem[0].amount

              return (
                <div key={product.id}>
                  <CategoryCard 
                    image={product.gallery[0]}
                    name={product.name}
                    currencySymbol={mockedSymbol}
                    price={price}
                    inStock={product.inStock}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryPage;