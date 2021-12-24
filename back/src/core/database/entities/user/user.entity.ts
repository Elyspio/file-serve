import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { File } from "./file";

@Entity("user")
export class UserEntity {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	username: string;

	@Column(() => File, { array: true })
	files: File[];
}
