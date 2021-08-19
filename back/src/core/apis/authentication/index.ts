import {Service} from "@tsed/common";
import {AuthenticationApi as IAuthenticationApi} from "./generated"
import {authorization_server_url} from "../../../config/authentication";

@Service()
export class AuthenticationApiClient {
	public readonly client: IAuthenticationApi;

	constructor() {
		this.client = new IAuthenticationApi(undefined, authorization_server_url)
	}
}
