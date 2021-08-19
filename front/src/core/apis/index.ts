import {ExampleApi} from "./backend"
import {AuthenticationApi, UsersApi} from "./authentication";
import axios from "axios";

const instance = axios.create({
	withCredentials: true,
})

export const Apis = {
	core: {
		example: new ExampleApi(undefined, window.config.endpoints.core, instance)
	},
	authentication: {
		login: new AuthenticationApi(undefined, window.config.endpoints.authentication, instance),
		user: new UsersApi(undefined, window.config.endpoints.authentication, instance)
	}
}




