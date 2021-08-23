/* tslint:disable */
/* eslint-disable */
/**
 * Api documentation
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import {Configuration} from './configuration';
import globalAxios, {AxiosInstance, AxiosPromise} from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
	assertParamExists,
	createRequestFunction,
	DUMMY_BASE_URL,
	serializeDataIfNeeded,
	setApiKeyToObject,
	setBasicAuthToObject,
	setBearerAuthToObject,
	setOAuthToObject,
	setSearchParams,
	toPathString
} from './common';
// @ts-ignore
import {BASE_PATH, BaseAPI, COLLECTION_FORMATS, RequestArgs, RequiredError} from './base';

/**
 *
 * @export
 * @interface CredentialsModel
 */
export interface CredentialsModel {
	/**
	 *
	 * @type {DockerModel}
	 * @memberof CredentialsModel
	 */
	docker?: DockerModel;
	/**
	 *
	 * @type {GithubModel}
	 * @memberof CredentialsModel
	 */
	github?: GithubModel;
}

/**
 *
 * @export
 * @interface DockerModel
 */
export interface DockerModel {
	/**
	 *
	 * @type {string}
	 * @memberof DockerModel
	 */
	password: string;
	/**
	 *
	 * @type {string}
	 * @memberof DockerModel
	 */
	username: string;
}

/**
 *
 * @export
 * @interface Forbidden
 */
export interface Forbidden {
	/**
	 * The error name
	 * @type {string}
	 * @memberof Forbidden
	 */
	name: string;
	/**
	 * An error message
	 * @type {string}
	 * @memberof Forbidden
	 */
	message: string;
	/**
	 * The status code of the exception
	 * @type {number}
	 * @memberof Forbidden
	 */
	status: number;
	/**
	 * A list of related errors
	 * @type {Array<GenericError>}
	 * @memberof Forbidden
	 */
	errors?: Array<GenericError>;
	/**
	 * The stack trace (only in development mode)
	 * @type {string}
	 * @memberof Forbidden
	 */
	stack?: string;
}

/**
 *
 * @export
 * @interface FrontThemeReturnModel
 */
export interface FrontThemeReturnModel {
	/**
	 *
	 * @type {string}
	 * @memberof FrontThemeReturnModel
	 */
	theme: FrontThemeReturnModelThemeEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum FrontThemeReturnModelThemeEnum {
	Dark = 'dark',
	Light = 'light'
}

/**
 *
 * @export
 * @interface GenericError
 */
export interface GenericError {
	/**
	 * The error name
	 * @type {string}
	 * @memberof GenericError
	 */
	name: string;
	/**
	 * An error message
	 * @type {string}
	 * @memberof GenericError
	 */
	message: string;

	[key: string]: object | any;
}

/**
 *
 * @export
 * @interface GithubModel
 */
export interface GithubModel {
	/**
	 *
	 * @type {string}
	 * @memberof GithubModel
	 */
	token: string;
	/**
	 *
	 * @type {string}
	 * @memberof GithubModel
	 */
	user: string;
}

/**
 *
 * @export
 * @interface PostLoginInitRequest
 */
export interface PostLoginInitRequest {
	/**
	 *
	 * @type {string}
	 * @memberof PostLoginInitRequest
	 */
	hash?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PostLoginInitRequest
	 */
	name: string;
}

/**
 *
 * @export
 * @interface PostLoginModel
 */
export interface PostLoginModel {
	/**
	 *
	 * @type {string}
	 * @memberof PostLoginModel
	 */
	token: string;
	/**
	 *
	 * @type {string}
	 * @memberof PostLoginModel
	 */
	comment?: string;
}

/**
 *
 * @export
 * @interface PostLoginModelWithSalt
 */
export interface PostLoginModelWithSalt {
	/**
	 *
	 * @type {string}
	 * @memberof PostLoginModelWithSalt
	 */
	salt: string;
}

/**
 *
 * @export
 * @interface PostLoginRequest
 */
export interface PostLoginRequest {
	/**
	 *
	 * @type {string}
	 * @memberof PostLoginRequest
	 */
	hash: string;
	/**
	 *
	 * @type {string}
	 * @memberof PostLoginRequest
	 */
	name: string;
}

/**
 *
 * @export
 * @interface SetUserSettingsModel
 */
export interface SetUserSettingsModel {
	/**
	 *
	 * @type {string}
	 * @memberof SetUserSettingsModel
	 */
	theme?: SetUserSettingsModelThemeEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum SetUserSettingsModelThemeEnum {
	Dark = 'dark',
	Light = 'light',
	System = 'system'
}

/**
 *
 * @export
 * @interface Unauthorized
 */
export interface Unauthorized {
	/**
	 * The error name
	 * @type {string}
	 * @memberof Unauthorized
	 */
	name: string;
	/**
	 * An error message
	 * @type {string}
	 * @memberof Unauthorized
	 */
	message: string;
	/**
	 * The status code of the exception
	 * @type {number}
	 * @memberof Unauthorized
	 */
	status: number;
	/**
	 * A list of related errors
	 * @type {Array<GenericError>}
	 * @memberof Unauthorized
	 */
	errors?: Array<GenericError>;
	/**
	 * The stack trace (only in development mode)
	 * @type {string}
	 * @memberof Unauthorized
	 */
	stack?: string;
}

/**
 *
 * @export
 * @interface UserSettingsModel
 */
export interface UserSettingsModel {
	/**
	 *
	 * @type {string}
	 * @memberof UserSettingsModel
	 */
	theme: UserSettingsModelThemeEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum UserSettingsModelThemeEnum {
	Dark = 'dark',
	Light = 'light',
	System = 'system'
}


/**
 * AuthenticationApi - axios parameter creator
 * @export
 */
export const AuthenticationApiAxiosParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 * Return all logged users (Not available in production)
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		get: async (options: any = {}): Promise<RequestArgs> => {
			const localVarPath = `/api/authentication/logged`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;


			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 * Login second step: check if the token provided match with the one computed by the server
		 * @param {PostLoginRequest} postLoginRequest
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		login: async (postLoginRequest: PostLoginRequest, options: any = {}): Promise<RequestArgs> => {
			// verify required parameter 'postLoginRequest' is not null or undefined
			assertParamExists('login', 'postLoginRequest', postLoginRequest)
			const localVarPath = `/api/authentication/login`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;


			localVarHeaderParameter['Content-Type'] = 'application/json';

			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
			localVarRequestOptions.data = serializeDataIfNeeded(postLoginRequest, localVarRequestOptions, configuration)

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 * Login first step: create a salt from user\'s name
		 * @param {PostLoginInitRequest} [postLoginInitRequest]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		loginInit: async (postLoginInitRequest?: PostLoginInitRequest, options: any = {}): Promise<RequestArgs> => {
			const localVarPath = `/api/authentication/login/init`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;


			localVarHeaderParameter['Content-Type'] = 'application/json';

			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
			localVarRequestOptions.data = serializeDataIfNeeded(postLoginInitRequest, localVarRequestOptions, configuration)

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 *
		 * @param {string} [authenticationLogin]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		logout: async (authenticationLogin?: string, options: any = {}): Promise<RequestArgs> => {
			const localVarPath = `/api/authentication/login`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'DELETE', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;


			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 *
		 * @param {string} [token]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		validToken: async (token?: string, options: any = {}): Promise<RequestArgs> => {
			const localVarPath = `/api/authentication/valid`;
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			if (token !== undefined) {
				localVarQueryParameter['token'] = token;
			}


			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
	}
};

/**
 * AuthenticationApi - functional programming interface
 * @export
 */
export const AuthenticationApiFp = function (configuration?: Configuration) {
	const localVarAxiosParamCreator = AuthenticationApiAxiosParamCreator(configuration)
	return {
		/**
		 * Return all logged users (Not available in production)
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async get(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.get(options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 * Login second step: check if the token provided match with the one computed by the server
		 * @param {PostLoginRequest} postLoginRequest
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async login(postLoginRequest: PostLoginRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PostLoginModel>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.login(postLoginRequest, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 * Login first step: create a salt from user\'s name
		 * @param {PostLoginInitRequest} [postLoginInitRequest]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async loginInit(postLoginInitRequest?: PostLoginInitRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PostLoginModelWithSalt>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.loginInit(postLoginInitRequest, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 *
		 * @param {string} [authenticationLogin]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async logout(authenticationLogin?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.logout(authenticationLogin, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 *
		 * @param {string} [token]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async validToken(token?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<boolean>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.validToken(token, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
	}
};

/**
 * AuthenticationApi - factory interface
 * @export
 */
export const AuthenticationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
	const localVarFp = AuthenticationApiFp(configuration)
	return {
		/**
		 * Return all logged users (Not available in production)
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		get(options?: any): AxiosPromise<void> {
			return localVarFp.get(options).then((request) => request(axios, basePath));
		},
		/**
		 * Login second step: check if the token provided match with the one computed by the server
		 * @param {PostLoginRequest} postLoginRequest
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		login(postLoginRequest: PostLoginRequest, options?: any): AxiosPromise<PostLoginModel> {
			return localVarFp.login(postLoginRequest, options).then((request) => request(axios, basePath));
		},
		/**
		 * Login first step: create a salt from user\'s name
		 * @param {PostLoginInitRequest} [postLoginInitRequest]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		loginInit(postLoginInitRequest?: PostLoginInitRequest, options?: any): AxiosPromise<PostLoginModelWithSalt> {
			return localVarFp.loginInit(postLoginInitRequest, options).then((request) => request(axios, basePath));
		},
		/**
		 *
		 * @param {string} [authenticationLogin]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		logout(authenticationLogin?: string, options?: any): AxiosPromise<void> {
			return localVarFp.logout(authenticationLogin, options).then((request) => request(axios, basePath));
		},
		/**
		 *
		 * @param {string} [token]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		validToken(token?: string, options?: any): AxiosPromise<boolean> {
			return localVarFp.validToken(token, options).then((request) => request(axios, basePath));
		},
	};
};

/**
 * AuthenticationApi - object-oriented interface
 * @export
 * @class AuthenticationApi
 * @extends {BaseAPI}
 */
export class AuthenticationApi extends BaseAPI {
	/**
	 * Return all logged users (Not available in production)
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof AuthenticationApi
	 */
	public get(options?: any) {
		return AuthenticationApiFp(this.configuration).get(options).then((request) => request(this.axios, this.basePath));
	}

	/**
	 * Login second step: check if the token provided match with the one computed by the server
	 * @param {PostLoginRequest} postLoginRequest
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof AuthenticationApi
	 */
	public login(postLoginRequest: PostLoginRequest, options?: any) {
		return AuthenticationApiFp(this.configuration).login(postLoginRequest, options).then((request) => request(this.axios, this.basePath));
	}

	/**
	 * Login first step: create a salt from user\'s name
	 * @param {PostLoginInitRequest} [postLoginInitRequest]
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof AuthenticationApi
	 */
	public loginInit(postLoginInitRequest?: PostLoginInitRequest, options?: any) {
		return AuthenticationApiFp(this.configuration).loginInit(postLoginInitRequest, options).then((request) => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {string} [authenticationLogin]
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof AuthenticationApi
	 */
	public logout(authenticationLogin?: string, options?: any) {
		return AuthenticationApiFp(this.configuration).logout(authenticationLogin, options).then((request) => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {string} [token]
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof AuthenticationApi
	 */
	public validToken(token?: string, options?: any) {
		return AuthenticationApiFp(this.configuration).validToken(token, options).then((request) => request(this.axios, this.basePath));
	}
}


/**
 * UsersApi - axios parameter creator
 * @export
 */
export const UsersApiAxiosParamCreator = function (configuration?: Configuration) {
	return {
		/**
		 *
		 * @param {string} username
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getUserCredentials: async (username: string, authenticationToken?: string, authenticationToken2?: string, options: any = {}): Promise<RequestArgs> => {
			// verify required parameter 'username' is not null or undefined
			assertParamExists('getUserCredentials', 'username', username)
			const localVarPath = `/api/users/{username}/credentials`
				.replace(`{${"username"}}`, encodeURIComponent(String(username)));
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			if (authenticationToken !== undefined && authenticationToken !== null) {
				localVarHeaderParameter['authentication-token'] = String(authenticationToken);
			}


			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 * Return username or token of logged user
		 * @param {'username' | 'token'} kind
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getUserInfo: async (kind: 'username' | 'token', authenticationToken?: string, authenticationToken2?: string, options: any = {}): Promise<RequestArgs> => {
			// verify required parameter 'kind' is not null or undefined
			assertParamExists('getUserInfo', 'kind', kind)
			const localVarPath = `/api/users/{kind}`
				.replace(`{${"kind"}}`, encodeURIComponent(String(kind)));
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			if (authenticationToken !== undefined && authenticationToken !== null) {
				localVarHeaderParameter['authentication-token'] = String(authenticationToken);
			}


			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 *
		 * @param {string} username
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getUserSettings: async (username: string, authenticationToken?: string, authenticationToken2?: string, options: any = {}): Promise<RequestArgs> => {
			// verify required parameter 'username' is not null or undefined
			assertParamExists('getUserSettings', 'username', username)
			const localVarPath = `/api/users/{username}/settings`
				.replace(`{${"username"}}`, encodeURIComponent(String(username)));
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			if (authenticationToken !== undefined && authenticationToken !== null) {
				localVarHeaderParameter['authentication-token'] = String(authenticationToken);
			}


			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 *
		 * @param {string} username
		 * @param {'dark' | 'light'} windowsTheme
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getUserTheme: async (username: string, windowsTheme: 'dark' | 'light', authenticationToken?: string, authenticationToken2?: string, options: any = {}): Promise<RequestArgs> => {
			// verify required parameter 'username' is not null or undefined
			assertParamExists('getUserTheme', 'username', username)
			// verify required parameter 'windowsTheme' is not null or undefined
			assertParamExists('getUserTheme', 'windowsTheme', windowsTheme)
			const localVarPath = `/api/users/{username}/settings/theme`
				.replace(`{${"username"}}`, encodeURIComponent(String(username)));
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			if (windowsTheme !== undefined) {
				localVarQueryParameter['windows_theme'] = windowsTheme;
			}

			if (authenticationToken !== undefined && authenticationToken !== null) {
				localVarHeaderParameter['authentication-token'] = String(authenticationToken);
			}


			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
		/**
		 *
		 * @param {string} username
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {SetUserSettingsModel} [setUserSettingsModel]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		setUserSettings: async (username: string, authenticationToken?: string, authenticationToken2?: string, setUserSettingsModel?: SetUserSettingsModel, options: any = {}): Promise<RequestArgs> => {
			// verify required parameter 'username' is not null or undefined
			assertParamExists('setUserSettings', 'username', username)
			const localVarPath = `/api/users/{username}/settings`
				.replace(`{${"username"}}`, encodeURIComponent(String(username)));
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
			let baseOptions;
			if (configuration) {
				baseOptions = configuration.baseOptions;
			}

			const localVarRequestOptions = {method: 'PATCH', ...baseOptions, ...options};
			const localVarHeaderParameter = {} as any;
			const localVarQueryParameter = {} as any;

			if (authenticationToken !== undefined && authenticationToken !== null) {
				localVarHeaderParameter['authentication-token'] = String(authenticationToken);
			}


			localVarHeaderParameter['Content-Type'] = 'application/json';

			setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
			let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
			localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
			localVarRequestOptions.data = serializeDataIfNeeded(setUserSettingsModel, localVarRequestOptions, configuration)

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions,
			};
		},
	}
};

/**
 * UsersApi - functional programming interface
 * @export
 */
export const UsersApiFp = function (configuration?: Configuration) {
	const localVarAxiosParamCreator = UsersApiAxiosParamCreator(configuration)
	return {
		/**
		 *
		 * @param {string} username
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getUserCredentials(username: string, authenticationToken?: string, authenticationToken2?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CredentialsModel>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getUserCredentials(username, authenticationToken, authenticationToken2, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 * Return username or token of logged user
		 * @param {'username' | 'token'} kind
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getUserInfo(kind: 'username' | 'token', authenticationToken?: string, authenticationToken2?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getUserInfo(kind, authenticationToken, authenticationToken2, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 *
		 * @param {string} username
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getUserSettings(username: string, authenticationToken?: string, authenticationToken2?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserSettingsModel>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getUserSettings(username, authenticationToken, authenticationToken2, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 *
		 * @param {string} username
		 * @param {'dark' | 'light'} windowsTheme
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async getUserTheme(username: string, windowsTheme: 'dark' | 'light', authenticationToken?: string, authenticationToken2?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FrontThemeReturnModel>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.getUserTheme(username, windowsTheme, authenticationToken, authenticationToken2, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
		/**
		 *
		 * @param {string} username
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {SetUserSettingsModel} [setUserSettingsModel]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async setUserSettings(username: string, authenticationToken?: string, authenticationToken2?: string, setUserSettingsModel?: SetUserSettingsModel, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.setUserSettings(username, authenticationToken, authenticationToken2, setUserSettingsModel, options);
			return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
		},
	}
};

/**
 * UsersApi - factory interface
 * @export
 */
export const UsersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
	const localVarFp = UsersApiFp(configuration)
	return {
		/**
		 *
		 * @param {string} username
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getUserCredentials(username: string, authenticationToken?: string, authenticationToken2?: string, options?: any): AxiosPromise<CredentialsModel> {
			return localVarFp.getUserCredentials(username, authenticationToken, authenticationToken2, options).then((request) => request(axios, basePath));
		},
		/**
		 * Return username or token of logged user
		 * @param {'username' | 'token'} kind
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getUserInfo(kind: 'username' | 'token', authenticationToken?: string, authenticationToken2?: string, options?: any): AxiosPromise<string> {
			return localVarFp.getUserInfo(kind, authenticationToken, authenticationToken2, options).then((request) => request(axios, basePath));
		},
		/**
		 *
		 * @param {string} username
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getUserSettings(username: string, authenticationToken?: string, authenticationToken2?: string, options?: any): AxiosPromise<UserSettingsModel> {
			return localVarFp.getUserSettings(username, authenticationToken, authenticationToken2, options).then((request) => request(axios, basePath));
		},
		/**
		 *
		 * @param {string} username
		 * @param {'dark' | 'light'} windowsTheme
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		getUserTheme(username: string, windowsTheme: 'dark' | 'light', authenticationToken?: string, authenticationToken2?: string, options?: any): AxiosPromise<FrontThemeReturnModel> {
			return localVarFp.getUserTheme(username, windowsTheme, authenticationToken, authenticationToken2, options).then((request) => request(axios, basePath));
		},
		/**
		 *
		 * @param {string} username
		 * @param {string} [authenticationToken] Authorization in header
		 * @param {string} [authenticationToken2] Authorization in cookie
		 * @param {SetUserSettingsModel} [setUserSettingsModel]
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		setUserSettings(username: string, authenticationToken?: string, authenticationToken2?: string, setUserSettingsModel?: SetUserSettingsModel, options?: any): AxiosPromise<object> {
			return localVarFp.setUserSettings(username, authenticationToken, authenticationToken2, setUserSettingsModel, options).then((request) => request(axios, basePath));
		},
	};
};

/**
 * UsersApi - object-oriented interface
 * @export
 * @class UsersApi
 * @extends {BaseAPI}
 */
export class UsersApi extends BaseAPI {
	/**
	 *
	 * @param {string} username
	 * @param {string} [authenticationToken] Authorization in header
	 * @param {string} [authenticationToken2] Authorization in cookie
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof UsersApi
	 */
	public getUserCredentials(username: string, authenticationToken?: string, authenticationToken2?: string, options?: any) {
		return UsersApiFp(this.configuration).getUserCredentials(username, authenticationToken, authenticationToken2, options).then((request) => request(this.axios, this.basePath));
	}

	/**
	 * Return username or token of logged user
	 * @param {'username' | 'token'} kind
	 * @param {string} [authenticationToken] Authorization in header
	 * @param {string} [authenticationToken2] Authorization in cookie
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof UsersApi
	 */
	public getUserInfo(kind: 'username' | 'token', authenticationToken?: string, authenticationToken2?: string, options?: any) {
		return UsersApiFp(this.configuration).getUserInfo(kind, authenticationToken, authenticationToken2, options).then((request) => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {string} username
	 * @param {string} [authenticationToken] Authorization in header
	 * @param {string} [authenticationToken2] Authorization in cookie
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof UsersApi
	 */
	public getUserSettings(username: string, authenticationToken?: string, authenticationToken2?: string, options?: any) {
		return UsersApiFp(this.configuration).getUserSettings(username, authenticationToken, authenticationToken2, options).then((request) => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {string} username
	 * @param {'dark' | 'light'} windowsTheme
	 * @param {string} [authenticationToken] Authorization in header
	 * @param {string} [authenticationToken2] Authorization in cookie
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof UsersApi
	 */
	public getUserTheme(username: string, windowsTheme: 'dark' | 'light', authenticationToken?: string, authenticationToken2?: string, options?: any) {
		return UsersApiFp(this.configuration).getUserTheme(username, windowsTheme, authenticationToken, authenticationToken2, options).then((request) => request(this.axios, this.basePath));
	}

	/**
	 *
	 * @param {string} username
	 * @param {string} [authenticationToken] Authorization in header
	 * @param {string} [authenticationToken2] Authorization in cookie
	 * @param {SetUserSettingsModel} [setUserSettingsModel]
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof UsersApi
	 */
	public setUserSettings(username: string, authenticationToken?: string, authenticationToken2?: string, setUserSettingsModel?: SetUserSettingsModel, options?: any) {
		return UsersApiFp(this.configuration).setUserSettings(username, authenticationToken, authenticationToken2, setUserSettingsModel, options).then((request) => request(this.axios, this.basePath));
	}
}


