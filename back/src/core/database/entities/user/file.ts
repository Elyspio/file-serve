import { Column } from "typeorm";

export class File {
	@Column()
	id: string;

	@Column()
	name: string;

	@Column()
	mime: string;

	@Column()
	gridId: string;

	constructor(id: string, name: string, mime: string, gridId: string) {
		this.id = id;
		this.name = name;
		this.mime = mime;
		this.gridId = gridId;
	}
}
