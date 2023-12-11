import {createContext, useContext, useReducer} from "react";
import {reducer} from "./reducer.js"
import cartItems from "./data.jsx";
//create a global context
const GlobalContext = createContext();


//convert array to Map
const cart = cartItems.map((item) => [item.id, item])


//setup a provider

//global setup for reducer
const defaultState = {
    cart: cart
}
export const AppContext = ({children}) => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    return (
        <GlobalContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}

//setup custom hook
export const useGlobalContext = () => {
    return useContext(GlobalContext)
}

