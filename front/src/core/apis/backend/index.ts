import { injectable } from "inversify";
import { PublicClient, UsersClient } from "./generated";
import axios from "axios";

const instance = axios.create({
	withCredentials: true,
	transformResponse: [],
});

@injectable()
export class BackendApi {
	public readonly clients = {
		files: {
			user: new UsersClient(window.config.endpoints.core, instance),
			public: new PublicClient(window.config.endpoints.core, instance),
		},
	};
}
