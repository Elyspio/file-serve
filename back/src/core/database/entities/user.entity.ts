import {Entity, OneToMany, PrimaryColumn} from "typeorm";
import {FileEntity} from "./file.entity";


@Entity("user")
export class UserEntity {

	@PrimaryColumn()
	username: string

	@OneToMany(() => FileEntity, object => object.user)
	files: FileEntity[]

}

