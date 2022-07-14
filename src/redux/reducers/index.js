import { combineReducers } from 'redux';
import { fetchProducts, fetchCurrency, changeCart, changeCartAmount, isModalOpen, changeCategory } from './reducers';

const allReducers = combineReducers({
    products: fetchProducts,
    currency: fetchCurrency,
    cart: changeCart,
    counter: changeCartAmount,
    cartModal: isModalOpen,
    category: changeCategory
});

export default allReducers;