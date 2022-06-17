// import { combineReducers } from 'redux';
// import { fetchProducts, productsHasErrored } from './reducers';
// export default combineReducers({
//     fetchProducts,
//     productsHasErrored
// });

import { combineReducers } from 'redux';
import { fetchProducts } from './reducers';

const allReducers = combineReducers({
    songs: fetchProducts,
});

export default allReducers;