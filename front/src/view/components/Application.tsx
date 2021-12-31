import * as React from "react";
import "./Application.scss";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import { Files } from "./files/Files";
import { useAppSelector } from "../../store";
import { toggleTheme } from "../../store/module/theme/theme.action";
import { createDrawerAction, withDrawer } from "./utils/drawer/Drawer.hoc";
import { Box } from "@mui/material";
import Login from "@mui/icons-material/AccountCircle";
import { ReactComponent as Logout } from "../icons/logout.svg";
import { login, logout, silentLogin } from "../../store/module/authentication/authentication.action";
import { updateToastTheme } from "./utils/toast";
import { Route, Switch as SwitchRouter } from "react-router";
import { Routes, routes } from "../../config/routes";
import { AddFile } from "./files/add/AddFile";
import { AddCircle, Home } from "@mui/icons-material";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { getFiles } from "../../store/module/files/files.action";
import { AuthenticationEvents } from "../../core/services/authentication.service";

function Application() {
	const dispatch = useDispatch();

	const { theme, themeIcon, logged } = useAppSelector((s) => ({
		theme: s.theme.current,
		themeIcon: s.theme.current === "dark" ? <Brightness5Icon /> : <Brightness3Icon />,
		logged: s.authentication.logged,
	}));

	React.useEffect(() => updateToastTheme(theme), [theme]);

	// region actions

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

	// endregion

	// region getFiles

	React.useEffect(() => {
		AuthenticationEvents.on("login", () => {
			dispatch(getFiles("user"));
		});
	}, [dispatch]);

	React.useEffect(() => {
		dispatch(silentLogin());
		dispatch(getFiles("public"));
	}, [dispatch]);

	// endregion

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
