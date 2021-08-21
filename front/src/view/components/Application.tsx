import * as React from 'react';
import "./Application.scss"
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Login from '@material-ui/icons/AccountCircle';
import {Files} from "./files/Files";
import {useAppDispatch, useAppSelector} from "../../store";
import {toggleTheme} from "../../store/module/theme/theme.action";
import {createDrawerAction, withDrawer} from "./utils/drawer/Drawer.hoc";
import {Box} from "@material-ui/core";
import {ReactComponent as Logout} from "../icons/logout.svg"
import {login, logout} from "../../store/module/authentication/authentication.action";
import {updateToastTheme} from "./utils/toast";

function Application() {

	const dispatch = useAppDispatch();

	const {theme, themeIcon, logged} = useAppSelector(s => ({
		theme: s.theme.current,
		themeIcon: s.theme.current === "dark" ? <Brightness5Icon/> : <Brightness3Icon/>,
		logged: s.authentication.logged
	}))

	React.useEffect(() => updateToastTheme(theme), [theme])

	const actions = [
		createDrawerAction(theme === "dark" ? "Light Mode" : "Dark Mode", {
			icon: themeIcon,
			onClick: () => dispatch(toggleTheme()),
		}),

	]

	if (logged) {
		actions.push(createDrawerAction("Logout", {
			icon: <Logout fill={"currentColor"}/>,
			onClick: () => dispatch(logout()),
		}))
	} else {
		actions.push(createDrawerAction("Login", {
			icon: <Login fill={"currentColor"}/>,
			onClick: () => dispatch(login()),
		}))
	}


	const drawer = withDrawer({
		component: <Files/>,
		actions,
		title: "Files"
	})


	return (
		<Box className={"Application"} bgcolor={"background.default"}>
			{drawer}
		</Box>
	);
}


export default Application
