import { Property, Required } from "@tsed/schema";

export class FileModel {
	/**
	 * Filename
	 */
	@Required()
	@Property()
	name: string;

	/**
	 * File id
	 */
	@Required()
	@Property()
	id: string;

	/**
	 * Mime type
	 */
	@Required()
	@Property()
	mime: string;
}

export class FileModelWithContent extends FileModel {
	/**
	 * base64 encoded content
	 */
	@Required()
	@Property(Number)
	content: number[];
}

export class AddFileBinary {
	/**
	 * Mime type
	 */
	@Required()
	@Property()
	mime: string;

	/**
	 * File's name
	 */
	@Required()
	@Property()
	name: string;

	@Required()
	@Property(Number)
	content: number[];
}
