import React, {Component} from 'react';
import './CategoryPage.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CategoryCard from './component/CategoryCard';
import { itemsFetchData, openMinicart, closeMinicart } from '../../redux/actions/actions';

class CategoryPage extends Component {
  componentDidMount() {
    this.props.category ? this.props.itemsFetchData(this.props.category) : this.props.itemsFetchData('all');
  }

  render() {
    const {
      currency,
      products,
      cartModal,
      category,
    } = this.props
    if (products.length === 0) {
      return (
        <div className='error-container'>
          <h3 className='error-message'>Loading the items...</h3>
          <div className='error-loader'></div>
        </div>
      )
    }
    return (
      <div className={cartModal ? 'category-page-container dim-layer' : 'category-page-container'}>
        <div className='category-container'>
          <h2>{category}</h2>
          <div className='category-container-cards'>
            {products.products.map((product) => {
              const priceItem = product.prices.filter(price => {
                return price.currency.symbol === currency
              })
              const price = priceItem[0].amount

              return (
                <div className='cards' key={product.id}>
                  <CategoryCard 
                    image={product.gallery[0]}
                    gallery={product.gallery}
                    name={product.name}
                    currencySymbol={currency}
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
  category: state.category.category,
  currency: state.currency.currency,
  cartModal: state.cartModal
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({itemsFetchData, openMinicart, closeMinicart}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);