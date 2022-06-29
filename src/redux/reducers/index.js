// import { combineReducers } from 'redux';
// import { fetchProducts, productsHasErrored } from './reducers';
// export default combineReducers({
//     fetchProducts,
//     productsHasErrored
// });

import { combineReducers } from 'redux';
import { fetchProducts, fetchCurrency, addItemToCartFromPdp, changeCartAmount } from './reducers';

const allReducers = combineReducers({
    products: fetchProducts,
    currency: fetchCurrency,
    cart: addItemToCartFromPdp,
    counter: changeCartAmount
});

export default allReducers;