import {createContext, useContext, useReducer} from "react";
import {reducer} from "/reducer.js"
//create a global context
const GlobalContext = createContext();

//setup a provider

//global setup for reducer
const defaultState = {}
export const AppContext = ({children}) => {

    const [state, dispatch] = useReducer(reducer, defaultState)
    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    )
}

//setup custom hook
export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
