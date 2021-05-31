import { createContext, useReducer } from "react";

export const context = createContext();

const initialState = {
  user: null,
  accessToken: null,
  loading: true,
  fetched: false,
  vacations: [],
  vacationsUpdate: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN": {
      return {
        ...state,
        user: action.payload.decodedAccessToken,
        accessToken: action.payload.rawAccessToken,
        loading: false,
        vacationsUpdate: true,
      };
    }

    case "LOG_OUT":
      return {
        ...state,
        user: null,
        loading: false,
        accessToken: null,
        vacations: [],
        vacationsUpdate: false,
      };

    case "SET_VACATIONS":
      return {
        ...state,
        vacations: action.payload,
        vacationsUpdate: false,
        fetched: true,
      };

    case "UPDATE_VACATIONS":
      return { ...state, vacationsUpdate: true, fetched: false };

    default:
      return state;
  }
};

export const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
};
