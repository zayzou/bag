import { CLEAR_CART, DECREASE, INCREASE, REMOVE_ITEM } from "./actions.js";

export const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE_ITEM) {
    state.cart.delete(action.payload.id);
    return { ...state };
  }

  if (action.type === INCREASE) {
    const item = state.cart.get(action.payload.id);
    item.amount++;
    state.cart.set(action.payload.id, item);
    return { ...state };
  }

  if (action.type === DECREASE) {
    const item = state.cart.get(action.payload.id);
    if (item.amount === 1) {
      state.cart.delete(action.payload.id);
    } else {
      item.amount--;
      state.cart.set(action.payload.id, item);
    }
    return { ...state };
  }
};
