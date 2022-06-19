// import { combineReducers } from 'redux';
// import { fetchProducts, productsHasErrored } from './reducers';
// export default combineReducers({
//     fetchProducts,
//     productsHasErrored
// });

import { combineReducers } from 'redux';
import { fetchProducts, fetchCurrency } from './reducers';

const allReducers = combineReducers({
    products: fetchProducts,
    currency: fetchCurrency
});

export default allReducers;