import { injectable } from "inversify";
import { PublicApi, UserApi } from "./generated";
import axios from "axios";

const instance = axios.create({
	withCredentials: true,
});

@injectable()
export class BackendApi {
	public readonly clients = {
		files: {
			user: new UserApi(undefined, window.config.endpoints.core, instance),
			public: new PublicApi(undefined, window.config.endpoints.core, instance),
		},
	};
}
