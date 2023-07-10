import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: {
        _id: "6495cc98474788d0a8791bc7",
        username: "jane",
        email: "jane@gmail.com",
        password: "$2b$10$yioiQn8x9oo5rGD6xMU9Xe.x.wSOUEn5alVwtFXmsp/lJjxOYYNmW",
        profilePicture: "",
        coverPicture: "",
        followers: [],
        following: [],
        isAdmin: false,
        desc: "hey its jane!",
        city: "New York",
        from: "London",
        experience: "9 yrs"
    },
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
        const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
        return ( <AuthContext.Provider value = {
                {
                    user: state.user,
                    isFetching: state.isFetching,
                    error: state.error,
                    dispatch,
                }
            } > { children } </AuthContext.Provider>)
        }