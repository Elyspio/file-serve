import { injectable } from "inversify";
import { PublicFilesApi, UserFilesApi } from "./generated";
import axios from "axios";

const instance = axios.create({
	withCredentials: true,
});

@injectable()
export class BackendApi {
	public readonly clients = {
		files: {
			user: new UserFilesApi(undefined, window.config.endpoints.core, instance),
			public: new PublicFilesApi(undefined, window.config.endpoints.core, instance),
		},
	};
}
