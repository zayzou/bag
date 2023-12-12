import { CLEAR_CART, DECREASE, INCREASE, REMOVE_ITEM } from "./actions.js";

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

  //why ?
  if (action.type === INCREASE) {
    state.cart.map((item) => {
      if (item[0] === action.payload.id) {
        item[1].amount++;
        return item;
      }
    });
    return { ...state };
  }

  if (action.type === DECREASE) {
    state.cart.map((item) => {
      if (item[0] === action.payload.id && item[1].amount > 0) {
        item[1].amount--;
        return item;
      }
    });
    return { ...state };
  }
};
