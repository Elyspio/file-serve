import * as React from "react";
import "./Application.scss";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import { Files } from "./files/Files";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleTheme } from "../../store/module/theme/theme.action";
import { createDrawerAction, withDrawer } from "./utils/drawer/Drawer.hoc";
import { Box } from "@material-ui/core";
import Login from "@material-ui/icons/AccountCircle";
import { ReactComponent as Logout } from "../icons/logout.svg";
import { login, logout, silentLogin } from "../../store/module/authentication/authentication.action";
import { updateToastTheme } from "./utils/toast";
import { Route, Switch as SwitchRouter } from "react-router";
import { Routes, routes } from "../../config/routes";
import { AddFile } from "./files/add/AddFile";
import { AddCircle, Home } from "@material-ui/icons";
import { push } from "connected-react-router";

function Application() {
	const dispatch = useAppDispatch();

	const { theme, themeIcon, logged } = useAppSelector((s) => ({
		theme: s.theme.current,
		themeIcon: s.theme.current === "dark" ? <Brightness5Icon /> : <Brightness3Icon />,
		logged: s.authentication.logged,
	}));

	React.useEffect(() => updateToastTheme(theme), [theme]);

	const actions = [
		createDrawerAction(theme === "dark" ? "Light Mode" : "Dark Mode", {
			icon: themeIcon,
			onClick: () => dispatch(toggleTheme()),
		}),
	];

	if (logged) {
		actions.push(
			createDrawerAction("Logout", {
				icon: <Logout fill={"currentColor"} />,
				onClick: () => dispatch(logout()),
			})
		);
	} else {
		actions.push(
			createDrawerAction("Login", {
				icon: <Login fill={"currentColor"} />,
				onClick: () => dispatch(login()),
			})
		);
	}

	const { home } = useAppSelector((s) => {
		const path = s.router.location.pathname;
		const obj: { [key in Routes]?: boolean } = {};
		Object.keys(routes).forEach((key) => {
			obj[key] = path === routes[key];
			return obj;
		});
		return obj;
	});

	if (!home) {
		actions.push(
			createDrawerAction("Home", {
				icon: <Home fill={"currentColor"} />,
				onClick: () => dispatch(push(routes.home)),
			})
		);
	} else {
		if (logged) {
			actions.push(
				createDrawerAction("Add file", {
					icon: <AddCircle fill={"currentColor"} />,
					onClick: () => dispatch(push(routes.addFile)),
				})
			);
		}
	}

	React.useEffect(() => {
		dispatch(silentLogin());
	}, [dispatch]);

	const drawer = withDrawer({
		component: (
			<SwitchRouter>
				<Route exact path={routes.home} component={Files} />
				<Route exact path={routes.addFile} component={AddFile} />
			</SwitchRouter>
		),
		actions,
		title: "Files",
	});

	return (
		<Box className={"Application"} bgcolor={"background.default"}>
			{drawer}
		</Box>
	);
}

export default Application;
