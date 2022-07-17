import "reflect-metadata";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Provider } from "react-redux";
import store, { history, useAppSelector } from "./store";
import Application from "./view/components/Application";
import { CssBaseline, StyledEngineProvider, Theme, ThemeProvider } from "@mui/material";
import { themes } from "./config/theme";
import { Config } from "./config/window";
import { ToastContainer } from "react-toastify";
import { Provider as DiProvider } from "inversify-react";
import { container } from "./core/di";
import { HistoryRouter } from "redux-first-history/rr6";
import { createRoot } from "react-dom/client";

declare module "@mui/styles/defaultTheme" {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme extends Theme {}
}

declare global {
	interface Window {
		config: Config;
	}
}

function Wrapper() {
	const theme = useAppSelector((state) => (state.theme.current === "dark" ? themes.dark : themes.light));

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				{/*<React.StrictMode>*/}
				<Application />
				{/*</React.StrictMode>*/}
				<ToastContainer position={"top-left"} theme={"dark"} />
				<CssBaseline />
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

function App() {
	return (
		<DiProvider container={container}>
			<Provider store={store}>
				<HistoryRouter history={history}>
					<Wrapper />
				</HistoryRouter>
			</Provider>
		</DiProvider>
	);
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
