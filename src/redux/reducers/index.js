import { combineReducers } from 'redux';
import { fetchProducts, fetchCurrency, changeCart, changeCartAmount } from './reducers';

const allReducers = combineReducers({
    products: fetchProducts,
    currency: fetchCurrency,
    cart: changeCart,
    counter: changeCartAmount
});

export default allReducers;