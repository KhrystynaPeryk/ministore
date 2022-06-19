import { FETCH_PRODUCTS_ALL,
        FETCH_PRODUCTS_CLOTHES,
        FETCH_PRODUCTS_TECH,
        FETCH_CURRENCY,
        ERROR_PRODUCTS
} from "../actions/types";

const initialProductsState = {
  products: [],
  category: 'all',
}

export function fetchProducts(state = initialProductsState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_ALL:
      return {
        ...state,
        products: action.payload,
        category: 'all',
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

const initialCurrencyState = {
  currency: '$',
}

export function fetchCurrency(state = initialCurrencyState, action) {
  switch (action.type) {
    case FETCH_CURRENCY:
      return {
        ...state,
        currency: action.payload
      }
      default:
        return state;
  }
}