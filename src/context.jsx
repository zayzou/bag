import {createContext, useContext, useReducer} from "react";
import {reducer} from "./reducer.js"
import cartItems from "./data.jsx";
import {CLEAR_CART} from "./actions.js";
//create a global context
const GlobalContext = createContext();


//convert array to Map
const cart = cartItems.map((item) => [item.id, item])

//global setup for reducer
const defaultState = {
    cart: cart
}


export const AppContext = ({children}) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const clear = () => {
        dispatch({type: CLEAR_CART});
        console.log("state after clear : ");
        console.log(state)
    }

    return (
        <GlobalContext.Provider value={{state, clear}}>
            {children}
        </GlobalContext.Provider>
    )
}

//setup custom hook
export const useGlobalContext = () => {
    return useContext(GlobalContext)
}

