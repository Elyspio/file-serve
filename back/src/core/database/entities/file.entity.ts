import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";


@Entity("file")
export class FileEntity {

	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	name: string

	/**
	 * base64 encoded
	 */
	@Column()
	content: string

	@ManyToOne(() => UserEntity, user => user.files)
	@JoinColumn({name: "username"})
	user: UserEntity

}

