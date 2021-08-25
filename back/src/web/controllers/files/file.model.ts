import {Property, Required} from "@tsed/schema";

export class FileModel {
	@Required()
	@Property()
	name: string

	@Required()
	@Property()
	id: string

}
