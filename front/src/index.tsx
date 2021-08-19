import "reflect-metadata";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Provider} from "react-redux";
import store, {useAppSelector} from "./store";
import Application from "./view/components/Application";
import {ThemeProvider} from '@material-ui/core';
import {themes} from "./config/theme";
import {Config} from "./config/window";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider as DiProvider } from 'inversify-react';
import {DependencyInjection} from "./core/services/di";


declare global {
	interface Window {
		config: Config;
	}
}


function Wrapper() {
	const theme = useAppSelector(state => state.theme.current === "dark" ? themes.dark : themes.light)

	return (
		<ThemeProvider theme={theme}>
			<Application/>
			<ToastContainer position={"top-left"}/>
		</ThemeProvider>
	);
}

function App() {

	return (
		<DiProvider container={DependencyInjection.container}>
			<Provider store={store}>
				<Wrapper/>
			</Provider>
		</DiProvider>
	);
}


ReactDOM.render(
	<App/>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
