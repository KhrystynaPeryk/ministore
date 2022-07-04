import { combineReducers } from 'redux';
import { fetchProducts, fetchCurrency, changeCart, changeCartAmount, isModalOpen } from './reducers';

const allReducers = combineReducers({
    products: fetchProducts,
    currency: fetchCurrency,
    cart: changeCart,
    counter: changeCartAmount,
    cartModal: isModalOpen
});

export default allReducers;