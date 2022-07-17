import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { themeReducer } from "./module/theme/theme.reducer";
import { authenticationReducer } from "./module/authentication/authentication.reducer";
import { createBrowserHistory } from "history";
import { filesReducer } from "./module/files/files.reducer";
import { container } from "../core/di";
import { createReduxHistoryContext } from "redux-first-history";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ history: createBrowserHistory() });

const store = configureStore({
	reducer: {
		router: routerReducer,
		theme: themeReducer,
		authentication: authenticationReducer,
		files: filesReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => {
		const arr = getDefaultMiddleware({ thunk: { extraArgument: { container } } });

		arr.push(routerMiddleware);
		return arr;
	},
});
export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export type ExtraArgument = { container: typeof container };

export default store;

export const history = createReduxHistory(store);
