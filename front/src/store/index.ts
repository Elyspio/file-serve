import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { themeReducer } from "./module/theme/theme.reducer";
import { authenticationReducer } from "./module/authentication/authentication.reducer";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory({
	basename: "/file-serve",
});

const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		theme: themeReducer,
		authentication: authenticationReducer,
		// rest of your reducers
	});

const store = configureStore({
	reducer: createRootReducer(history),
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => [routerMiddleware(history), ...getDefaultMiddleware()],
});
export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default store;
