import React, {Component} from 'react';
import './CategoryPage.scss';
import { connect } from 'react-redux';
import CategoryCard from './component/CategoryCard';
import { itemsFetchData } from '../../redux/actions/actions';

// REDUX - https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3

class CategoryPage extends Component {
  componentDidMount() {
    this.props.fetchData('all');
  }

  render() {
    const currentCurrency = this.props.currency;
    if (this.props.products.length === 0) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    console.log(this.props)
    return (
      <div className='category-page-container'>
        <div className='category-container'>
          <h2>Category: {this.props.category.toUpperCase()}</h2>
          <div className='category-container-cards'>
            {this.props.products.products.map((product) => {
              const priceItem = product.prices.filter(price => {
                return price.currency.symbol === currentCurrency.currency
              })
              const price = priceItem[0].amount

              return (
                <div className='cards' key={product.id}>
                  <CategoryCard 
                    image={product.gallery[0]}
                    name={product.name}
                    currencySymbol={currentCurrency.currency}
                    price={price}
                    inStock={product.inStock}
                    id={product.id}
                    brand={product.brand}
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

const mapStateToProps = (state) => ({
  products: state.products.products,
  category: state.products.category,
  currency: state.currency
  // hasErrored: state.productsHasErrored
});

// it will provide us with the actions we need to use in our component so we can dispatch them and change our state

const mapDispatchToProps = (dispatch) => ({ fetchData: (category) => dispatch(itemsFetchData(category)) });

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);