import React, {Component} from 'react';
import './DescriptionPage.scss';


class DescriptionPage extends Component {
  componentDidMount() {
        //     fetch('http://localhost:4000/', fetchParams(getProducts(category)))
        // .then((response) => response.json())
        // .then((productList) => {
        //     if (category === "all") {
        //        return dispatch(fetchAllProducts(productList.data.category.products)) 
        //     } else if (category === "tech") {
        //         return dispatch(fetchTechProducts(productList.data.category.products)) 
        //     } else if (category === "clothes") {
        //         return dispatch(fetchClothesProducts(productList.data.category.products)) 
        //     }
        // })
        console.log(this.props)
  }
  render() {
    return (
      <div>
          DescriptionPage
      </div>
    )
  }
}

export default DescriptionPage;