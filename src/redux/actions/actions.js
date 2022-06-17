import { FETCH_PRODUCTS, ERROR_PRODUCTS } from "./types";

// export function fetchProducts(products) {
//     return {
//         type: FETCH_PRODUCTS,
//         products
//     }
// }

// export function productsHasErrored(bool) {
//     return {
//         type: ERROR_PRODUCTS,
//         hasErrored: bool
//     };
// }

export const fetchProducts = (products) => (dispatch) => {
    dispatch({
        type: FETCH_PRODUCTS,
        payload: {products}
    })
    return Promise.resolve();
}

export const productsHasErrored = (bool) => (dispatch) => {
    dispatch({
        type: ERROR_PRODUCTS,
        payload: {hasErrored: bool}
    })
    return Promise.reject();
}
