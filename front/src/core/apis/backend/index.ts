import {injectable} from "inversify";
import {FilesApi} from "./generated"
import axios from "axios";

const instance = axios.create({
	withCredentials: true,
})


@injectable()
export class BackendApi {

	public  readonly clients = {
		files: new FilesApi(undefined, window.config.endpoints.core, instance),
	}

}
