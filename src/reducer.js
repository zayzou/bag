import {
  CLEAR_CART,
  DECREASE,
  INCREASE,
  REMOVE_ITEM,
  FETCH_DATA,
  SET_LOADING,
} from "./actions.js";
export const reducer = (state, action) => {

  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true };
  }
  if (action.type === FETCH_DATA) {
    const newCart = new Map(action.payload.cart.map((item) => [item.id, item]));
    return { ...state, cart: newCart, isLoading: false };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE_ITEM) {
    const newMap = new Map(state.cart);
    newMap.delete(action.payload.id);
    return { ...state, cart: newMap };
  }

  if (action.type === INCREASE) {
    const newMap = new Map(state.cart);
    const item = newMap.get(action.payload.id);
    const newItem = { ...item, amount: item.amount + 1 };
    newMap.set(action.payload.id, newItem);
    return { ...state, cart: newMap };
  }

  if (action.type === DECREASE) {
    const newMap = new Map(state.cart);
    const item = newMap.get(action.payload.id);
    if (item.amount === 1) {
      newMap.delete(action.payload.id);
      return { ...state, cart: newMap };
    }
    const newItem = { ...item, amount: item.amount - 1 };
    newMap.set(action.payload.id, newItem);
    return { ...state, cart: newMap };
  }

  throw new Error("Unsupported -action- Exception - " + action.type);
};
