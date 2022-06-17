import { FETCH_PRODUCTS_ALL,
        FETCH_PRODUCTS_CLOTHES,
        FETCH_PRODUCTS_TECH,
        ERROR_PRODUCTS
} from "../actions/types";

const initialState = {
  products: [],
  category: 'all'
}

export function fetchProducts(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_ALL:
      return {
        ...state,
        products: action.payload,
        category: 'all'
      }
    case FETCH_PRODUCTS_TECH:
      return {
        ...state,
        products: action.payload,
        category: 'tech'
      }
    case FETCH_PRODUCTS_CLOTHES:
      return {
        ...state,
        products: action.payload,
        category: 'clothes'
      }
    // case ERROR_PRODUCTS:
    //   return {
    //     ...state,
    //     products: [],
    //     category: null
    //   }
      default:
        return state;
    }
}