import React, {Component} from 'react';
import './CategoryPage.scss';
// import { getProducts } from '../../queries/Queries';
// import { fetchParams } from '../../helpers/fetchParams';
import { connect } from 'react-redux';
import { productsFetchData } from '../../queries/fetchData';
import CategoryCard from './component/CategoryCard';

// REDUX - https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3
const mockedSymbol = '$';
const mockedCategory = 'all';

class CategoryPage extends Component {
  constructor() {
    super()
    this.state = {
      products : []
    }
  }

  // componentDidMount() {
  //   // fetch('http://localhost:4000', fetchParams(getProducts(mockedCategory)))
  //   // .then((response) => response.json())
  //   // .then(productList => {
  //   //   console.log(productList)
  //   //   this.setState({ products: productList.data.category.products });
  //   // });
  //   this.props.fetchData(mockedCategory);
  // }

  render() {
     const { songs } = this.props.songs
    // if (this.props.hasErrored) {
    //   return <p>Sorry! There was an error loading the items</p>;
    //     }
    // if (this.props.products) {
    //   console.log(this.props.products)
    // }
    return (
      <div className='category-page-container'>
        <div className='category-container'>
          <h1>CategoryPage</h1>
          <div className='category-container-cards'>
            {/* {this.props.products.map((product) => {
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
            })} */}
            <ul>
        {songs.map((song, i) => {
          return <li key={song.title}>{song.title}</li>
        })}
      </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  songs: state.songs,
  // hasErrored: state.productsHasErrored
});


// it will provide us with the actions we need to use in our component so we can dispatch them and change our state
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (category) => dispatch(productsFetchData(category))
    };
};

export default connect(mapStateToProps, null)(CategoryPage);