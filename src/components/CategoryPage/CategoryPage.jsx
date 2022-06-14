import React, {Component} from 'react';
import './CategoryPage.scss';
import { getProducts } from '../../queries/Queries';
import { fetchParams } from '../../helpers/fetchParams';
import CategoryCard from './component/CategoryCard';

class CategoryPage extends Component {
  constructor() {
    super()
    this.state = {
      products : []
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    query: `
        query {
            category(input: { title: "clothes" }) {
                products {
                    name
                    id
                    prices {
                        currency {
                            symbol
                        }
                        amount
                    }
                }
            }
        }
    `
})
    })
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
              console.log('product.name -', product.name)
              console.log('price in $ -', product.prices.filter(price => {
                return price.currency.symbol === "$"
              }) )
            })}
            {/* <CategoryCard></CategoryCard> */}
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryPage;