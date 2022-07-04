import { FETCH_PRODUCTS_ALL,
        FETCH_PRODUCTS_CLOTHES,
        FETCH_PRODUCTS_TECH,
        FETCH_CURRENCY,
        ERROR_PRODUCTS,
        ADD_ITEM_FROM_PDP,
        INCREMENT_CART_COUNT,
        DECREMENT_CART_COUNT,
        INCREMENT_PRODUCT_QTY,
        DECREMENT_PRODUCT_QTY
} from "../actions/types";
import { isEqualArraysOfObjs } from "../../helpers/isEqualArrayOfObjs";

export function fetchProducts(state = {
  products: [],
  category: 'all',
  }, action) {
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

export function fetchCurrency(state = {
  currency: '$',
  }, action) {
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

export function changeCart(state = {items: []}, action) {
  switch (action.type) {
    case ADD_ITEM_FROM_PDP:
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    case INCREMENT_PRODUCT_QTY:
      const itemId = action.payload.itemToCart.id;
      const itemAttributes = action.payload.itemToCart.selectedAttributes
      return {
        ...state,
        items : state.items.map((item) => {
          const exp = {...item, 
            itemToCart: {...item.itemToCart, qty : item.itemToCart.qty + 1 }
          }
          return item.itemToCart.id === itemId && isEqualArraysOfObjs(item.itemToCart.selectedAttributes, itemAttributes) ? exp : item
        })
      };
    default:
      return state;
  }
}

export function changeCartAmount(state = 0, action) {
  switch (action.type) {
    case INCREMENT_CART_COUNT:
      return state + 1;
    case DECREMENT_CART_COUNT:
      return state - 1;
    default:
      return state;
  }
}
