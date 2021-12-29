/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.15.5.0 (NJsonSchema v10.6.6.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from "axios";

export interface IPublicClient {
	/**
	 * @return Success
	 */
	publicGetFiles(): Promise<FileModel[]>;

	/**
	 * @param filename (optional)
	 * @param location (optional)
	 * @param file (optional)
	 * @return Success
	 */
	publicAddFile(filename?: string | undefined, location?: string | undefined, file?: FileParameter | undefined): Promise<string>;

	/**
	 * @return Success
	 */
	publicGetFileContent(id: string): Promise<FileResponse>;

	/**
	 * @return Success
	 */
	publicGetFileContentAsString(id: string): Promise<string>;

	/**
	 * @return Success
	 */
	publicGetFileContentAsStream(id: string): Promise<void>;

	/**
	 * @return Success
	 */
	publicGetFile(id: string): Promise<FileModel>;

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	publicDeleteFile(id: string, authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined): Promise<void>;
}

export class PublicClient implements IPublicClient {
	protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
	private instance: AxiosInstance;
	private baseUrl: string;

	constructor(baseUrl?: string, instance?: AxiosInstance) {
		this.instance = instance ? instance : axios.create();

		this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
	}

	/**
	 * @return Success
	 */
	publicGetFiles(cancelToken?: CancelToken | undefined): Promise<FileModel[]> {
		let url_ = this.baseUrl + "/files/public";
		url_ = url_.replace(/[?&]$/, "");

		let options_ = <AxiosRequestConfig>{
			method: "GET",
			url: url_,
			headers: {
				Accept: "text/plain",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processPublicGetFiles(_response);
			});
	}

	/**
	 * @param filename (optional)
	 * @param location (optional)
	 * @param file (optional)
	 * @return Success
	 */
	publicAddFile(filename?: string | undefined, location?: string | undefined, file?: FileParameter | undefined, cancelToken?: CancelToken | undefined): Promise<string> {
		let url_ = this.baseUrl + "/files/public";
		url_ = url_.replace(/[?&]$/, "");

		const content_ = new FormData();
		if (filename === null || filename === undefined) throw new Error("The parameter 'filename' cannot be null.");
		else content_.append("filename", filename.toString());
		if (location === null || location === undefined) throw new Error("The parameter 'location' cannot be null.");
		else content_.append("location", location.toString());
		if (file === null || file === undefined) throw new Error("The parameter 'file' cannot be null.");
		else content_.append("file", file.data, file.fileName ? file.fileName : "file");

		let options_ = <AxiosRequestConfig>{
			data: content_,
			method: "POST",
			url: url_,
			headers: {
				Accept: "text/plain",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processPublicAddFile(_response);
			});
	}

	/**
	 * @return Success
	 */
	publicGetFileContent(id: string, cancelToken?: CancelToken | undefined): Promise<FileResponse> {
		let url_ = this.baseUrl + "/files/public/{id}/binary";
		if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_ = <AxiosRequestConfig>{
			responseType: "blob",
			method: "GET",
			url: url_,
			headers: {
				Accept: "application/octet-stream",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processPublicGetFileContent(_response);
			});
	}

	/**
	 * @return Success
	 */
	publicGetFileContentAsString(id: string, cancelToken?: CancelToken | undefined): Promise<string> {
		let url_ = this.baseUrl + "/files/public/{id}/string";
		if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_ = <AxiosRequestConfig>{
			method: "GET",
			url: url_,
			headers: {
				Accept: "text/plain",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processPublicGetFileContentAsString(_response);
			});
	}

	/**
	 * @return Success
	 */
	publicGetFileContentAsStream(id: string, cancelToken?: CancelToken | undefined): Promise<void> {
		let url_ = this.baseUrl + "/files/public/{id}/stream";
		if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_ = <AxiosRequestConfig>{
			method: "GET",
			url: url_,
			headers: {},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processPublicGetFileContentAsStream(_response);
			});
	}

	/**
	 * @return Success
	 */
	publicGetFile(id: string, cancelToken?: CancelToken | undefined): Promise<FileModel> {
		let url_ = this.baseUrl + "/files/public/{id}";
		if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_ = <AxiosRequestConfig>{
			method: "GET",
			url: url_,
			headers: {
				Accept: "text/plain",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processPublicGetFile(_response);
			});
	}

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	publicDeleteFile(id: string, authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined, cancelToken?: CancelToken | undefined): Promise<void> {
		let url_ = this.baseUrl + "/files/public/{id}";
		if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_ = <AxiosRequestConfig>{
			method: "DELETE",
			url: url_,
			headers: {
				"authentication-token": authentication_tokenHeader !== undefined && authentication_tokenHeader !== null ? "" + authentication_tokenHeader : "",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processPublicDeleteFile(_response);
			});
	}

	protected processPublicGetFiles(response: AxiosResponse): Promise<FileModel[]> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200) {
			const _responseText = response.data;
			let result200: any = null;
			let resultData200 = _responseText;
			result200 = JSON.parse(resultData200);
			return Promise.resolve<FileModel[]>(result200);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<FileModel[]>(<any>null);
	}

	protected processPublicAddFile(response: AxiosResponse): Promise<string> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 201) {
			const _responseText = response.data;
			let result201: any = null;
			let resultData201 = _responseText;
			result201 = JSON.parse(resultData201);
			return Promise.resolve<string>(result201);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<string>(<any>null);
	}

	protected processPublicGetFileContent(response: AxiosResponse): Promise<FileResponse> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200 || status === 206) {
			const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
			const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
			const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
			return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data]), headers: _headers });
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<FileResponse>(<any>null);
	}

	protected processPublicGetFileContentAsString(response: AxiosResponse): Promise<string> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200) {
			const _responseText = response.data;
			let result200: any = null;
			let resultData200 = _responseText;
			result200 = resultData200;
			return Promise.resolve<string>(result200);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<string>(<any>null);
	}

	protected processPublicGetFileContentAsStream(response: AxiosResponse): Promise<void> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 206) {
			const _responseText = response.data;
			return Promise.resolve<void>(<any>null);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<void>(<any>null);
	}

	protected processPublicGetFile(response: AxiosResponse): Promise<FileModel> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200) {
			const _responseText = response.data;
			let result200: any = null;
			let resultData200 = _responseText;
			result200 = JSON.parse(resultData200);
			return Promise.resolve<FileModel>(result200);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<FileModel>(<any>null);
	}

	protected processPublicDeleteFile(response: AxiosResponse): Promise<void> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 204) {
			const _responseText = response.data;
			return Promise.resolve<void>(<any>null);
		} else if (status === 401) {
			const _responseText = response.data;
			return throwException("Unauthorized", status, _responseText, _headers);
		} else if (status === 403) {
			const _responseText = response.data;
			return throwException("Forbidden", status, _responseText, _headers);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<void>(<any>null);
	}
}

export interface IUsersClient {
	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	usersGetFiles(authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined): Promise<FileModel[]>;

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @param filename (optional)
	 * @param location (optional)
	 * @param file (optional)
	 * @return Success
	 */
	usersAddFile(
		authentication_tokenHeader?: any | undefined,
		authentication_tokenCookie?: any | undefined,
		filename?: string | undefined,
		location?: string | undefined,
		file?: FileParameter | undefined
	): Promise<string>;

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	usersGetFileContent(id: string, authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined): Promise<FileResponse>;

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	usersGetFileContentAsString(id: string, authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined): Promise<string>;

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	usersGetFileContentAsStream(id: string, authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined): Promise<void>;

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	usersGetFile(id: string, authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined): Promise<FileModel>;

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	usersDeleteFile(id: string, authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined): Promise<void>;
}

export class UsersClient implements IUsersClient {
	protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
	private instance: AxiosInstance;
	private baseUrl: string;

	constructor(baseUrl?: string, instance?: AxiosInstance) {
		this.instance = instance ? instance : axios.create();

		this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
	}

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	usersGetFiles(authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined, cancelToken?: CancelToken | undefined): Promise<FileModel[]> {
		let url_ = this.baseUrl + "/files/user";
		url_ = url_.replace(/[?&]$/, "");

		let options_ = <AxiosRequestConfig>{
			method: "GET",
			url: url_,
			headers: {
				"authentication-token": authentication_tokenHeader !== undefined && authentication_tokenHeader !== null ? "" + authentication_tokenHeader : "",
				Accept: "text/plain",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processUsersGetFiles(_response);
			});
	}

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @param filename (optional)
	 * @param location (optional)
	 * @param file (optional)
	 * @return Success
	 */
	usersAddFile(
		authentication_tokenHeader?: any | undefined,
		authentication_tokenCookie?: any | undefined,
		filename?: string | undefined,
		location?: string | undefined,
		file?: FileParameter | undefined,
		cancelToken?: CancelToken | undefined
	): Promise<string> {
		let url_ = this.baseUrl + "/files/user";
		url_ = url_.replace(/[?&]$/, "");

		const content_ = new FormData();
		if (filename === null || filename === undefined) throw new Error("The parameter 'filename' cannot be null.");
		else content_.append("filename", filename.toString());
		if (location === null || location === undefined) throw new Error("The parameter 'location' cannot be null.");
		else content_.append("location", location.toString());
		if (file === null || file === undefined) throw new Error("The parameter 'file' cannot be null.");
		else content_.append("file", file.data, file.fileName ? file.fileName : "file");

		let options_ = <AxiosRequestConfig>{
			data: content_,
			method: "POST",
			url: url_,
			headers: {
				"authentication-token": authentication_tokenHeader !== undefined && authentication_tokenHeader !== null ? "" + authentication_tokenHeader : "",
				Accept: "text/plain",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processUsersAddFile(_response);
			});
	}

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	usersGetFileContent(id: string, authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined, cancelToken?: CancelToken | undefined): Promise<FileResponse> {
		let url_ = this.baseUrl + "/files/user/{id}/binary";
		if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_ = <AxiosRequestConfig>{
			responseType: "blob",
			method: "GET",
			url: url_,
			headers: {
				"authentication-token": authentication_tokenHeader !== undefined && authentication_tokenHeader !== null ? "" + authentication_tokenHeader : "",
				Accept: "application/octet-stream",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processUsersGetFileContent(_response);
			});
	}

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	usersGetFileContentAsString(id: string, authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined, cancelToken?: CancelToken | undefined): Promise<string> {
		let url_ = this.baseUrl + "/files/user/{id}/string";
		if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_ = <AxiosRequestConfig>{
			method: "GET",
			url: url_,
			headers: {
				"authentication-token": authentication_tokenHeader !== undefined && authentication_tokenHeader !== null ? "" + authentication_tokenHeader : "",
				Accept: "text/plain",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processUsersGetFileContentAsString(_response);
			});
	}

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	usersGetFileContentAsStream(id: string, authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined, cancelToken?: CancelToken | undefined): Promise<void> {
		let url_ = this.baseUrl + "/files/user/{id}/stream";
		if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_ = <AxiosRequestConfig>{
			method: "GET",
			url: url_,
			headers: {
				"authentication-token": authentication_tokenHeader !== undefined && authentication_tokenHeader !== null ? "" + authentication_tokenHeader : "",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processUsersGetFileContentAsStream(_response);
			});
	}

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	usersGetFile(id: string, authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined, cancelToken?: CancelToken | undefined): Promise<FileModel> {
		let url_ = this.baseUrl + "/files/user/{id}";
		if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_ = <AxiosRequestConfig>{
			method: "GET",
			url: url_,
			headers: {
				"authentication-token": authentication_tokenHeader !== undefined && authentication_tokenHeader !== null ? "" + authentication_tokenHeader : "",
				Accept: "text/plain",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processUsersGetFile(_response);
			});
	}

	/**
	 * @param authentication_tokenHeader (optional)
	 * @param authentication_tokenCookie (optional)
	 * @return Success
	 */
	usersDeleteFile(id: string, authentication_tokenHeader?: any | undefined, authentication_tokenCookie?: any | undefined, cancelToken?: CancelToken | undefined): Promise<void> {
		let url_ = this.baseUrl + "/files/user/{id}";
		if (id === undefined || id === null) throw new Error("The parameter 'id' must be defined.");
		url_ = url_.replace("{id}", encodeURIComponent("" + id));
		url_ = url_.replace(/[?&]$/, "");

		let options_ = <AxiosRequestConfig>{
			method: "DELETE",
			url: url_,
			headers: {
				"authentication-token": authentication_tokenHeader !== undefined && authentication_tokenHeader !== null ? "" + authentication_tokenHeader : "",
			},
			cancelToken,
		};

		return this.instance
			.request(options_)
			.catch((_error: any) => {
				if (isAxiosError(_error) && _error.response) {
					return _error.response;
				} else {
					throw _error;
				}
			})
			.then((_response: AxiosResponse) => {
				return this.processUsersDeleteFile(_response);
			});
	}

	protected processUsersGetFiles(response: AxiosResponse): Promise<FileModel[]> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200) {
			const _responseText = response.data;
			let result200: any = null;
			let resultData200 = _responseText;
			result200 = JSON.parse(resultData200);
			return Promise.resolve<FileModel[]>(result200);
		} else if (status === 401) {
			const _responseText = response.data;
			return throwException("Unauthorized", status, _responseText, _headers);
		} else if (status === 403) {
			const _responseText = response.data;
			return throwException("Forbidden", status, _responseText, _headers);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<FileModel[]>(<any>null);
	}

	protected processUsersAddFile(response: AxiosResponse): Promise<string> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 201) {
			const _responseText = response.data;
			let result201: any = null;
			let resultData201 = _responseText;
			result201 = JSON.parse(resultData201);
			return Promise.resolve<string>(result201);
		} else if (status === 401) {
			const _responseText = response.data;
			return throwException("Unauthorized", status, _responseText, _headers);
		} else if (status === 403) {
			const _responseText = response.data;
			return throwException("Forbidden", status, _responseText, _headers);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<string>(<any>null);
	}

	protected processUsersGetFileContent(response: AxiosResponse): Promise<FileResponse> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200 || status === 206) {
			const contentDisposition = response.headers ? response.headers["content-disposition"] : undefined;
			const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
			const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
			return Promise.resolve({ fileName: fileName, status: status, data: new Blob([response.data]), headers: _headers });
		} else if (status === 401) {
			const _responseText = response.data;
			return throwException("Unauthorized", status, _responseText, _headers);
		} else if (status === 403) {
			const _responseText = response.data;
			return throwException("Forbidden", status, _responseText, _headers);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<FileResponse>(<any>null);
	}

	protected processUsersGetFileContentAsString(response: AxiosResponse): Promise<string> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200) {
			const _responseText = response.data;
			let result200: any = null;
			let resultData200 = _responseText;
			result200 = resultData200;
			return Promise.resolve<string>(result200);
		} else if (status === 401) {
			const _responseText = response.data;
			return throwException("Unauthorized", status, _responseText, _headers);
		} else if (status === 403) {
			const _responseText = response.data;
			return throwException("Forbidden", status, _responseText, _headers);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<string>(<any>null);
	}

	protected processUsersGetFileContentAsStream(response: AxiosResponse): Promise<void> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 206) {
			const _responseText = response.data;
			return Promise.resolve<void>(<any>null);
		} else if (status === 401) {
			const _responseText = response.data;
			return throwException("Unauthorized", status, _responseText, _headers);
		} else if (status === 403) {
			const _responseText = response.data;
			return throwException("Forbidden", status, _responseText, _headers);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<void>(<any>null);
	}

	protected processUsersGetFile(response: AxiosResponse): Promise<FileModel> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 200) {
			const _responseText = response.data;
			let result200: any = null;
			let resultData200 = _responseText;
			result200 = JSON.parse(resultData200);
			return Promise.resolve<FileModel>(result200);
		} else if (status === 401) {
			const _responseText = response.data;
			return throwException("Unauthorized", status, _responseText, _headers);
		} else if (status === 403) {
			const _responseText = response.data;
			return throwException("Forbidden", status, _responseText, _headers);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<FileModel>(<any>null);
	}

	protected processUsersDeleteFile(response: AxiosResponse): Promise<void> {
		const status = response.status;
		let _headers: any = {};
		if (response.headers && typeof response.headers === "object") {
			for (let k in response.headers) {
				if (response.headers.hasOwnProperty(k)) {
					_headers[k] = response.headers[k];
				}
			}
		}
		if (status === 204) {
			const _responseText = response.data;
			return Promise.resolve<void>(<any>null);
		} else if (status === 401) {
			const _responseText = response.data;
			return throwException("Unauthorized", status, _responseText, _headers);
		} else if (status === 403) {
			const _responseText = response.data;
			return throwException("Forbidden", status, _responseText, _headers);
		} else if (status !== 200 && status !== 204) {
			const _responseText = response.data;
			return throwException("An unexpected server error occurred.", status, _responseText, _headers);
		}
		return Promise.resolve<void>(<any>null);
	}
}

export interface FileModel {
	id: string;
	filename: string;
	username: string;
	mime: string;
	location: string;
	size: number;
}

export interface FileParameter {
	data: any;
	fileName: string;
}

export interface FileResponse {
	data: Blob;
	status: number;
	fileName?: string;
	headers?: { [name: string]: any };
}

export class ApiException extends Error {
	message: string;
	status: number;
	response: string;
	headers: { [key: string]: any };
	result: any;
	protected isApiException = true;

	constructor(message: string, status: number, response: string, headers: { [key: string]: any }, result: any) {
		super();

		this.message = message;
		this.status = status;
		this.response = response;
		this.headers = headers;
		this.result = result;
	}

	static isApiException(obj: any): obj is ApiException {
		return obj.isApiException === true;
	}
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any }, result?: any): any {
	if (result !== null && result !== undefined) throw result;
	else throw new ApiException(message, status, response, headers, null);
}

function isAxiosError(obj: any | undefined): obj is AxiosError {
	return obj && obj.isAxiosError === true;
}
