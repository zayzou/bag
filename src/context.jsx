import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer.js";
import cartItems from "./data.jsx";
import {
  CLEAR_CART,
  DECREASE,
  FETCH_DATA,
  INCREASE,
  REMOVE_ITEM,
  SET_LOADING,
} from "./actions.js";

import { useEffect } from "react";

//create a global context
const GlobalContext = createContext();

//global setup for reducer
const defaultState = {
  cart: new Map(),
  isLoading: false,
};

export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  let totalAmount = 0;

  let totalCost = 0;

  const clear = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };

  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  const fetchData = async () => {
    dispatch({ type: SET_LOADING });
    const response = await fetch(
      "https://www.course-api.com/react-useReducer-cart-project"
    );
    const cart = await response.json();
    dispatch({ type: FETCH_DATA, payload: { cart } });
  };

  //move this to another file
  for (const [key, { amount, price }] of state.cart) {
    totalAmount += amount;
    totalCost += amount * price;
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        state,
        clear,
        removeItem,
        increase,
        decrease,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

//setup custom hook
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
