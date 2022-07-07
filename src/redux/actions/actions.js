import { FETCH_PRODUCTS_ALL,
        FETCH_PRODUCTS_CLOTHES,
        FETCH_PRODUCTS_TECH,
        FETCH_CURRENCY,
        ERROR_PRODUCTS,
        ADD_PRODUCT_TO_CART,
        INCREMENT_CART_COUNT,
        DECREMENT_CART_COUNT,
        INCREMENT_PRODUCT_QTY,
        DECREMENT_PRODUCT_QTY,
        REMOVE_PRODUCT_FROM_CART,
        OPEN_MINICART,
        CLOSE_MINICART
} from "./types";

import { fetchParams } from "../../helpers/fetchParams";
import { getProducts } from "../../queries/Queries";

export const fetchAllProducts = products => {
    return {
        type: FETCH_PRODUCTS_ALL,
        payload: {products},
    }
}

export const fetchTechProducts = products => {
    return {
        type: FETCH_PRODUCTS_TECH,
        payload: {products},
    }
}

export const fetchClothesProducts = products => {
    return {
        type: FETCH_PRODUCTS_CLOTHES,
        payload: {products},
    }
}

export const fetchCurrency = currency => {
    return {
        type: FETCH_CURRENCY,
        payload: currency,
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

//cart modal
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
            if (category === "all") {
               return dispatch(fetchAllProducts(productList.data.category.products)) 
            } else if (category === "tech") {
                return dispatch(fetchTechProducts(productList.data.category.products)) 
            } else if (category === "clothes") {
                return dispatch(fetchClothesProducts(productList.data.category.products)) 
            }
        })
        // .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function fetchCurrentCurrency(currFromDropdown) {
    return (dispatch) => {
        if(currFromDropdown) {
            return dispatch(fetchCurrency(currFromDropdown))
        }
    }
}

// export function addItemAttributes(itemToCart) {
//     return (dispatch) => {
//         return dispatch(addAttributes(itemToCart))
//     }
// }