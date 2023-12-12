import { CLEAR_CART, REMOVE_ITEM } from "./actions.js";

export const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE_ITEM) {
    return {
      ...state,
      cart: state.cart.filter((item) => item[0] !== action.payload.id),
    };
  }
};
