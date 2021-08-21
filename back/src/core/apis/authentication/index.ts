import {Service} from "@tsed/common";
import {AuthenticationApi as IAuthenticationApi, UsersApi} from "./generated"
import {authorization_server_url} from "../../../config/authentication";

@Service()
export class AuthenticationApiClient {
	public readonly client: IAuthenticationApi;

	constructor() {
		this.client = new IAuthenticationApi(undefined, authorization_server_url)
	}
}


@Service()
export class UsersApiClient {
	public readonly client: UsersApi;

	constructor() {
		this.client = new UsersApi(undefined, authorization_server_url)
	}
}
