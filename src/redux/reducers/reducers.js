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
} from "../actions/types";
import { isEqualArraysOfObjs } from "../../helpers/isEqualArrayOfObjs";

export function fetchProducts(state = {
  products: [],
  }, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
          return {
            ...state,
            products: action.payload,
          }
        default:
          return state;
    }
}

export function changeCategory(state = {
  category: 'all',
  }, action) {
    switch (action.type) {
      case CHANGE_CATEGORY:
        return {
          ...state,
          category: action.payload
        }
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
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case INCREMENT_PRODUCT_QTY:
      const itemId = action.payload.itemToCart.id;
      const itemAttributes = action.payload.itemToCart.selectedAttributes;
      return {
        ...state,
        items : state.items.map((item) => {
          const exp = {...item, 
            itemToCart: {...item.itemToCart, qty : item.itemToCart.qty + 1 }
          }
          return item.itemToCart.id === itemId && isEqualArraysOfObjs(item.itemToCart.selectedAttributes, itemAttributes) ? exp : item
        })
      };
    case DECREMENT_PRODUCT_QTY:
      const itemIdToDecrement = action.payload.itemToCart.id;
      const itemAttributesToDecrement = action.payload.itemToCart.selectedAttributes;
      return {
        ...state,
        items : state.items.map((item) => {
          const exp = {...item, 
            itemToCart: {...item.itemToCart, qty : item.itemToCart.qty - 1 }
          }
          return item.itemToCart.id === itemIdToDecrement && isEqualArraysOfObjs(item.itemToCart.selectedAttributes, itemAttributesToDecrement) ? exp : item
        })
      };
    case REMOVE_PRODUCT_FROM_CART:
      const itemIdToRemove = action.payload.itemToCart;
      return {
        ...state,
        items : state.items.filter((item) => item.itemToCart.cartId !== itemIdToRemove)
      }
    default:
      return state;
  }
}

export function isModalOpen( state = false, action) {
  switch (action.type) {
    case OPEN_MINICART:
      return true;
    case CLOSE_MINICART:
      return false
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
