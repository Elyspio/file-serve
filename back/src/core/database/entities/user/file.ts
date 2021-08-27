import {Column} from "typeorm";


export class File {

	@Column()
	id: string

	@Column()
	name: string

	/**
	 * base64 encoded
	 */
	@Column()
	content: string

	@Column()
	mime: string


	constructor(id: string, name: string, content: string, mime: string) {
		this.id = id;
		this.name = name;
		this.content = content;
		this.mime = mime;
	}
}

