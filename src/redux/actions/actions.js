import { FETCH_PRODUCTS_ALL,
        FETCH_PRODUCTS_CLOTHES,
        FETCH_PRODUCTS_TECH,
        ERROR_PRODUCTS
} from "./types";

import { fetchParams } from "../../helpers/fetchParams";
import { getProducts } from "../../queries/Queries";

// export function productsHasErrored(bool) {
//     return {
//         type: ERROR_PRODUCTS,
//         hasErrored: bool
//     };
// }

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

// export const productsHasErrored = error => {
//     return {
//         type: ERROR_PRODUCTS,
//         payload: { error }
//     }
// }

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