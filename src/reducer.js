import {CLEAR_CART} from "./actions.js";

export const reducer = (state, action) => {
    if (action === CLEAR_CART) {
        return {...state, cart: new Map()}
    }
}