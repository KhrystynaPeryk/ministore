import React, {Component} from 'react';
import './CategoryPage.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CategoryCard from './component/CategoryCard';
import { itemsFetchData, isMinicartOpen } from '../../redux/actions/actions';

class CategoryPage extends Component {
  componentDidMount() {
    this.props.category ? this.props.itemsFetchData(this.props.category) : this.props.itemsFetchData('all');
  }

  render() {
    const currentCurrency = this.props.currency;
    if (this.props.products.length === 0) {
      return (
        <div className='error-container'>
          <h3 className='error-message'>Loading the items...</h3>
          <div className='error-loader'></div>
        </div>
      )
    }
    return (
      <div className={this.props.cartModal ? 'category-page-container dim-layer' : 'category-page-container'}>
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
                    gallery={product.gallery}
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
  currency: state.currency,
  cartModal: state.cartModal
  // hasErrored: state.productsHasErrored
});

// it will provide us with the actions we need to use in our component so we can dispatch them and change our state

// const mapDispatchToProps = (dispatch) => ({ fetchData: (category) => dispatch(itemsFetchData(category)) });
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({itemsFetchData, isMinicartOpen}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);