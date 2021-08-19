import {env} from "process"

export const authorization_cookie_token = "authentication_token";
export const authorization_cookie_login = "authentication_login";
export const authorization_server_url = env.AUTHENTICATION_SERVER_URI ?? "http://localhost/authentication"
