import React, {Component} from 'react';
import './CartModal.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addAttributes, incrementCartCount } from '../../../redux/actions/actions';
import { fetchParams } from '../../../helpers/fetchParams';
import { getProduct } from '../../../queries/Queries';
import CartModalItem from './CartModalItem';

class CartModal extends Component {
  constructor() {
    super()
    this.state = {
        // brand: '',
        // name: '',
        // gallery: [],
        // prices: [],
        // mainPhoto: '',
        // attributes: [],
        // id: '',
    }
  }
  componentDidMount() {
    // // make an array of redux cart.items
    // const arrOfIds = this.props.cart.items.map((item) => item.items.id)
    // // fetching data for each id
    // arrOfIds.forEach((id) => {
    //     fetch('http://localhost:4000/', fetchParams(getProduct(id)))
    //     .then((response) => response.json())
    //     .then((res) => {
    //         this.setState({brand: res.data.product.brand})
    //         this.setState({name: res.data.product.name})
    //         this.setState({gallery: res.data.product.gallery})
    //         this.setState({mainPhoto: res.data.product.gallery[0]})
    //         this.setState({attributes: res.data.product.attributes})
    //         this.setState({prices: res.data.product.prices})
    //         this.setState({id: res.data.product.id})
    //     })
    // })
  }


  render() {
    const arrOfIds = this.props.cart.items.map((item) => item.items.id)
    return (
        <div className='modal'>
            {arrOfIds.forEach((id) => {
                fetch('http://localhost:4000/', fetchParams(getProduct(id)))
                .then((response) => response.json())
                .then((res) => {
                    console.log('here', res.data.product.brand)
                    return <CartModalItem 
                        brand={res.data.product.brand}
                        name={res.data.product.name}
                        gallery={res.data.product.gallery}
                        mainPhoto={res.data.product.gallery[0]}
                        attributes={res.data.product.attributes}
                        prices={res.data.product.prices}
                    />
                })
            })}
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({addAttributes, incrementCartCount}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);