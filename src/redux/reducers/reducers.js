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

export function addItemToCartFromPdp(state = {items: []}, action) {
  switch (action.type) {
    case ADD_ITEM_FROM_PDP:
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    case INCREMENT_PRODUCT_QTY:
      return {
        ...state,
        items : state.items.map((item) => {
          return {...item, 
            itemToCart: {...item.itemToCart, qty : item.itemToCart.qty + 1 }
          }
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

// export function changeProductQty(state = {qty: 0}, action) {
//   switch (action.type) {
//     case INCREMENT_PRODUCT_QTY:
//       return {
//         ...state,
//         qty : state.qty + 1,
//       };
//     case DECREMENT_PRODUCT_QTY:
//       return {
//         ...state,
//         qty : state - 1,
//       }
//     default:
//       return state;
//   }
// }