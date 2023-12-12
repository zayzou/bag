import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer.js";
import cartItems from "./data.jsx";
import { CLEAR_CART, REMOVE_ITEM } from "./actions.js";
//create a global context
const GlobalContext = createContext();

//convert array to Map
const cart = cartItems.map((item) => [item.id, item]);

//global setup for reducer
const defaultState = {
  cart: cart,
};

export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const clear = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };

  return (
    <GlobalContext.Provider value={{ state, clear, removeItem }}>
      {children}
    </GlobalContext.Provider>
  );
};

//setup custom hook
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
