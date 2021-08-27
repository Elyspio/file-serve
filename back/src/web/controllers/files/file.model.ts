import {Property, Required} from "@tsed/schema";
import {File} from "../../../core/database/entities/user/file";

export class FileModel {
	/**
	 * Filename
	 */
	@Required()
	@Property()
	name: string

	/**
	 * File id
	 */
	@Required()
	@Property()
	id: string

	/**
	 * Mime type
	 */
	@Required()
	@Property()
	mime: string
}


export class FileModelWithContent implements File {
	/**
	 * Filename
	 */
	@Required()
	@Property()
	name: string

	/**
	 * File id
	 */
	@Required()
	@Property()
	id: string

	/**
	 * Mime type
	 */
	@Required()
	@Property()
	mime: string

	/**
	 * base64 encoded content
	 */
	@Required()
	@Property()
	content: string;

}
