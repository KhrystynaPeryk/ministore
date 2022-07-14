import { 
        FETCH_PRODUCTS,
        FETCH_CURRENCY,
        ADD_PRODUCT_TO_CART,
        INCREMENT_CART_COUNT,
        DECREMENT_CART_COUNT,
        INCREMENT_PRODUCT_QTY,
        DECREMENT_PRODUCT_QTY,
        REMOVE_PRODUCT_FROM_CART,
        OPEN_MINICART,
        CLOSE_MINICART,
        CHANGE_CATEGORY
} from "./types";

import { fetchParams } from "../../helpers/fetchParams";
import { getProducts } from "../../queries/Queries";

export const fetchProducts = products => {
    return {
        type: FETCH_PRODUCTS,
        payload: {products},
    }
}

export const fetchCurrency = currency => {
    return {
        type: FETCH_CURRENCY,
        payload: currency
    }
}

export const fetchCategory = category => {
    return {
        type: CHANGE_CATEGORY,
        payload: category
    }
}

export const addAttributes = itemToCart => {
    return {
        type: ADD_PRODUCT_TO_CART,
        payload: {itemToCart}
    }
}

export const removeProduct = itemToCart => {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        payload: {itemToCart}
    }
}

export const incrementCartCount = () => {
    return {
        type: INCREMENT_CART_COUNT
    }
}

export const decrementCartCount = () => {
    return {
        type: DECREMENT_CART_COUNT
    }
}

export const incrementProductQty = itemToCart => {
    return {
        type: INCREMENT_PRODUCT_QTY,
        payload: {itemToCart}
    }
}

export const decrementProductQty = itemToCart => {
    return {
        type: DECREMENT_PRODUCT_QTY,
        payload: {itemToCart}
    }
}

export const openMinicart = () => {
    return {
        type: OPEN_MINICART
    }
}

export const closeMinicart = () => {
    return {
        type: CLOSE_MINICART
    }
}

export function itemsFetchData(category) {
    return (dispatch) => {
        fetch('http://localhost:4000/', fetchParams(getProducts(category)))
        .then((response) => response.json())
        .then((productList) => {
            return dispatch(fetchProducts(productList.data.category.products))
        })
    };
}

export function fetchCurrentCurrency(currFromDropdown) {
    return (dispatch) => {
        if(currFromDropdown) {
            return dispatch(fetchCurrency(currFromDropdown))
        }
    }
}

