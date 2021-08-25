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


	constructor(id: string, name: string, content: string) {
		this.id = id;
		this.name = name;
		this.content = content;
	}
}

