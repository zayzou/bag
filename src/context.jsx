import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer.js";
import cartItems from "./data.jsx";
import { CLEAR_CART, DECREASE, INCREASE, REMOVE_ITEM } from "./actions.js";
import { useEffect } from "react";
//create a global context
const GlobalContext = createContext();

//convert array to Map
const items = cartItems.map((item) => [item.id, item]);
const cart = new Map(items);
//global setup for reducer
const defaultState = {
  cart: cart,
  isLoading: true,
};

export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

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

  const totalAmount = Array.from(state.cart).reduce(
    (a, c) => a + c[1].amount,
    0
  );

  const totalCost = Array.from(state.cart).reduce(
    (a, c) => a + c[1].amount * c[1].price,
    0
  );

  const setIsLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading();
    }, 500);
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
