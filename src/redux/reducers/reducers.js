import { FETCH_PRODUCTS, ERROR_PRODUCTS } from "../actions/types";

const initialState = {
  songs: [
    { title: "I love redux" },
    { title: "The redux song" },
    { title: "Run to the redux hill" },
  ],
}

export function fetchProducts(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        // case FETCH_PRODUCTS:
        //     return {
        //         ...state,
        //         products: payload.products
        //     }
        default:
            return state;
    }
}

// export function productsHasErrored(state = false, action) {
//     const { type } = action;
//     switch (type) {
//         case ERROR_PRODUCTS:
//             return {
//                 ...state,
//                 hasErrored : true,
//                 products: null
//             }
//         default:
//             return state;
//     }
// }