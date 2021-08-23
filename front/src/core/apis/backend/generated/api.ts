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


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface BadRequest
 */
export interface BadRequest {
    /**
     * The error name
     * @type {string}
     * @memberof BadRequest
     */
    name: string;
    /**
     * An error message
     * @type {string}
     * @memberof BadRequest
     */
    message: string;
    /**
     * The status code of the exception
     * @type {number}
     * @memberof BadRequest
     */
    status: number;
    /**
     * A list of related errors
     * @type {Array<GenericError>}
     * @memberof BadRequest
     */
    errors?: Array<GenericError>;
    /**
     * The stack trace (only in development mode)
     * @type {string}
     * @memberof BadRequest
     */
    stack?: string;
}
/**
 * 
 * @export
 * @interface FileModel
 */
export interface FileModel {
    /**
     * 
     * @type {string}
     * @memberof FileModel
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof FileModel
     */
    id: number;
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
 * @interface GenericError
 */
export interface GenericError {
    [key: string]: object | any;

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
}
/**
 * 
 * @export
 * @interface InternalServerError
 */
export interface InternalServerError {
    /**
     * The error name
     * @type {string}
     * @memberof InternalServerError
     */
    name: string;
    /**
     * An error message
     * @type {string}
     * @memberof InternalServerError
     */
    message: string;
    /**
     * The status code of the exception
     * @type {number}
     * @memberof InternalServerError
     */
    status: number;
    /**
     * A list of related errors
     * @type {Array<GenericError>}
     * @memberof InternalServerError
     */
    errors?: Array<GenericError>;
    /**
     * The stack trace (only in development mode)
     * @type {string}
     * @memberof InternalServerError
     */
    stack?: string;
}
/**
 * 
 * @export
 * @interface NotFound
 */
export interface NotFound {
    /**
     * The error name
     * @type {string}
     * @memberof NotFound
     */
    name: string;
    /**
     * An error message
     * @type {string}
     * @memberof NotFound
     */
    message: string;
    /**
     * The status code of the exception
     * @type {number}
     * @memberof NotFound
     */
    status: number;
    /**
     * A list of related errors
     * @type {Array<GenericError>}
     * @memberof NotFound
     */
    errors?: Array<GenericError>;
    /**
     * The stack trace (only in development mode)
     * @type {string}
     * @memberof NotFound
     */
    stack?: string;
}

/**
 * FilesApi - axios parameter creator
 * @export
 */
export const FilesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} filename 
         * @param {any} file 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addCommonFile: async (filename: string, file: any, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'filename' is not null or undefined
            assertParamExists('addCommonFile', 'filename', filename)
            // verify required parameter 'file' is not null or undefined
            assertParamExists('addCommonFile', 'file', file)
            const localVarPath = `/api/files/{filename}`
                .replace(`{${"filename"}}`, encodeURIComponent(String(filename)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();


            if (file !== undefined) { 
                localVarFormParams.append('file', file as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} filename 
         * @param {any} file 
         * @param {string} [authenticationToken] 
         * @param {string} [authenticationToken2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addUserFile: async (filename: string, file: any, authenticationToken?: string, authenticationToken2?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'filename' is not null or undefined
            assertParamExists('addUserFile', 'filename', filename)
            // verify required parameter 'file' is not null or undefined
            assertParamExists('addUserFile', 'file', file)
            const localVarPath = `/api/files/user/{filename}`
                .replace(`{${"filename"}}`, encodeURIComponent(String(filename)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();

            if (authenticationToken !== undefined && authenticationToken !== null) {
                localVarHeaderParameter['authentication-token'] = String(authenticationToken);
            }


            if (file !== undefined) { 
                localVarFormParams.append('file', file as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteCommonFile: async (id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteCommonFile', 'id', id)
            const localVarPath = `/api/files/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
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
         * @param {number} id 
         * @param {string} [authenticationToken] 
         * @param {string} [authenticationToken2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUserFile: async (id: number, authenticationToken?: string, authenticationToken2?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteUserFile', 'id', id)
            const localVarPath = `/api/files/user/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
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
         * Get the content of a file without authentication
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCommonFile: async (id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getCommonFile', 'id', id)
            const localVarPath = `/api/files/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
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
         * Get the content of a file of the logged user
         * @param {number} id 
         * @param {string} [authenticationToken] 
         * @param {string} [authenticationToken2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserFile: async (id: number, authenticationToken?: string, authenticationToken2?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getUserFile', 'id', id)
            const localVarPath = `/api/files/user/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
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
         * Get all common files name
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listCommonFiles: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/files`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
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
         * Get all files for the logged user
         * @param {string} [authenticationToken] 
         * @param {string} [authenticationToken2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUserFiles: async (authenticationToken?: string, authenticationToken2?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/files/user`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
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
    }
};

/**
 * FilesApi - functional programming interface
 * @export
 */
export const FilesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = FilesApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} filename 
         * @param {any} file 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addCommonFile(filename: string, file: any, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<number>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addCommonFile(filename, file, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} filename 
         * @param {any} file 
         * @param {string} [authenticationToken] 
         * @param {string} [authenticationToken2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addUserFile(filename: string, file: any, authenticationToken?: string, authenticationToken2?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<number>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addUserFile(filename, file, authenticationToken, authenticationToken2, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteCommonFile(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteCommonFile(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} id 
         * @param {string} [authenticationToken] 
         * @param {string} [authenticationToken2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteUserFile(id: number, authenticationToken?: string, authenticationToken2?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUserFile(id, authenticationToken, authenticationToken2, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get the content of a file without authentication
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCommonFile(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCommonFile(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get the content of a file of the logged user
         * @param {number} id 
         * @param {string} [authenticationToken] 
         * @param {string} [authenticationToken2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUserFile(id: number, authenticationToken?: string, authenticationToken2?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUserFile(id, authenticationToken, authenticationToken2, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get all common files name
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listCommonFiles(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<FileModel>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listCommonFiles(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get all files for the logged user
         * @param {string} [authenticationToken] 
         * @param {string} [authenticationToken2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listUserFiles(authenticationToken?: string, authenticationToken2?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<FileModel>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listUserFiles(authenticationToken, authenticationToken2, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * FilesApi - factory interface
 * @export
 */
export const FilesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = FilesApiFp(configuration)
    return {
        /**
         * 
         * @param {string} filename 
         * @param {any} file 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addCommonFile(filename: string, file: any, options?: any): AxiosPromise<number> {
            return localVarFp.addCommonFile(filename, file, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} filename 
         * @param {any} file 
         * @param {string} [authenticationToken] 
         * @param {string} [authenticationToken2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addUserFile(filename: string, file: any, authenticationToken?: string, authenticationToken2?: string, options?: any): AxiosPromise<number> {
            return localVarFp.addUserFile(filename, file, authenticationToken, authenticationToken2, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteCommonFile(id: number, options?: any): AxiosPromise<void> {
            return localVarFp.deleteCommonFile(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {string} [authenticationToken] 
         * @param {string} [authenticationToken2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUserFile(id: number, authenticationToken?: string, authenticationToken2?: string, options?: any): AxiosPromise<void> {
            return localVarFp.deleteUserFile(id, authenticationToken, authenticationToken2, options).then((request) => request(axios, basePath));
        },
        /**
         * Get the content of a file without authentication
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCommonFile(id: number, options?: any): AxiosPromise<string> {
            return localVarFp.getCommonFile(id, options).then((request) => request(axios, basePath));
        },
        /**
         * Get the content of a file of the logged user
         * @param {number} id 
         * @param {string} [authenticationToken] 
         * @param {string} [authenticationToken2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserFile(id: number, authenticationToken?: string, authenticationToken2?: string, options?: any): AxiosPromise<string> {
            return localVarFp.getUserFile(id, authenticationToken, authenticationToken2, options).then((request) => request(axios, basePath));
        },
        /**
         * Get all common files name
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listCommonFiles(options?: any): AxiosPromise<Array<FileModel>> {
            return localVarFp.listCommonFiles(options).then((request) => request(axios, basePath));
        },
        /**
         * Get all files for the logged user
         * @param {string} [authenticationToken] 
         * @param {string} [authenticationToken2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUserFiles(authenticationToken?: string, authenticationToken2?: string, options?: any): AxiosPromise<Array<FileModel>> {
            return localVarFp.listUserFiles(authenticationToken, authenticationToken2, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * FilesApi - object-oriented interface
 * @export
 * @class FilesApi
 * @extends {BaseAPI}
 */
export class FilesApi extends BaseAPI {
    /**
     * 
     * @param {string} filename 
     * @param {any} file 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApi
     */
    public addCommonFile(filename: string, file: any, options?: any) {
        return FilesApiFp(this.configuration).addCommonFile(filename, file, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} filename 
     * @param {any} file 
     * @param {string} [authenticationToken] 
     * @param {string} [authenticationToken2] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApi
     */
    public addUserFile(filename: string, file: any, authenticationToken?: string, authenticationToken2?: string, options?: any) {
        return FilesApiFp(this.configuration).addUserFile(filename, file, authenticationToken, authenticationToken2, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApi
     */
    public deleteCommonFile(id: number, options?: any) {
        return FilesApiFp(this.configuration).deleteCommonFile(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} id 
     * @param {string} [authenticationToken] 
     * @param {string} [authenticationToken2] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApi
     */
    public deleteUserFile(id: number, authenticationToken?: string, authenticationToken2?: string, options?: any) {
        return FilesApiFp(this.configuration).deleteUserFile(id, authenticationToken, authenticationToken2, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get the content of a file without authentication
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApi
     */
    public getCommonFile(id: number, options?: any) {
        return FilesApiFp(this.configuration).getCommonFile(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get the content of a file of the logged user
     * @param {number} id 
     * @param {string} [authenticationToken] 
     * @param {string} [authenticationToken2] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApi
     */
    public getUserFile(id: number, authenticationToken?: string, authenticationToken2?: string, options?: any) {
        return FilesApiFp(this.configuration).getUserFile(id, authenticationToken, authenticationToken2, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get all common files name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApi
     */
    public listCommonFiles(options?: any) {
        return FilesApiFp(this.configuration).listCommonFiles(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get all files for the logged user
     * @param {string} [authenticationToken] 
     * @param {string} [authenticationToken2] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApi
     */
    public listUserFiles(authenticationToken?: string, authenticationToken2?: string, options?: any) {
        return FilesApiFp(this.configuration).listUserFiles(authenticationToken, authenticationToken2, options).then((request) => request(this.axios, this.basePath));
    }
}


