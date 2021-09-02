import {Controller, Delete, Get, MultipartFile, PathParams, PlatformMulterFile, Post, Req} from "@tsed/common";
import {Description, Name, Required, Returns} from "@tsed/schema";
import {Log} from "../../../core/utils/decorators/logger";
import {getLogger} from "../../../core/utils/logger";
import {Inject} from "@tsed/di";
import {FileService} from "../../../core/services/file.service";
import {NotFound, Unauthorized} from "@tsed/exceptions";
import {InternalServerError} from "@tsed/exceptions/lib/serverErrors";
import {Request} from "express";
import {Protected} from "../../decorators/protected";
import {FileModel, FileModelWithContent} from "./file.model";
import {Forbidden} from "@tsed/exceptions/lib/clientErrors";

@Controller("/files/user")
@Name("User")
export class UserFilesController {

	private static log = getLogger.controller(UserFilesController);

	@Inject()
	private filesService: FileService

	@Get("/")
	@Returns(200, Array).Of(FileModel)
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Description("Get all files for the logged user")
	@Protected()
	@Log(UserFilesController.log)
	async listFiles(@Req() {auth}: Request) {
		try {
			return this.filesService.listFiles(auth!.username)
		} catch (e: any) {
			throw new InternalServerError((e as Error).message)
		}
	}


	@Get("/:id")
	@Returns(200, FileModelWithContent)
	@Returns(404, NotFound).Description("File not found")
	@Log(UserFilesController.log)
	@Description("Get the content of a file of the logged user")
	@Protected()
	async getFile(
		@PathParams("id") id: string,
		@Req() {auth}: Request
	) {
		try {
			return this.filesService.getFile(auth!.username, id)
		} catch (e: any) {
			switch (e) {
				case FileService.exceptions.fileNotFound:
					throw new NotFound("Could not find file specified")
				case FileService.exceptions.notAuthorized:
					throw new Forbidden("This is not your file !!!")
				default:
					throw new InternalServerError((e as Error).message)
			}
		}
	}


	@Get("/:id/content")
	@Returns(200, String).ContentType("text/plain")
	@Returns(NotFound.STATUS, NotFound).Description("File not found")
	@Returns(Unauthorized.STATUS, Unauthorized).Description("File not found")
	@Log(UserFilesController.log)
	@Description("Get the content of a file of the logged user")
	@Protected()
	async getFileContent(
		@PathParams("id") id: string,
		@Req() {auth}: Request
	) {
		try {
			return this.filesService.getFileContent(auth!.username, id)
		} catch (e: any) {
			switch (e) {
				case FileService.exceptions.fileNotFound:
					throw new NotFound("Could not find file specified")
				case FileService.exceptions.notAuthorized:
					throw new Unauthorized("This is not your file !!!")
				default:
					throw new InternalServerError((e as Error).message)
			}
		}
	}


	@Post("/:filename")
	@Returns(201, Number).ContentType("text/plain")
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Protected()
	async addFile(
		@Required() @PathParams("filename") filename: string,
		@Required() @MultipartFile("file") file: PlatformMulterFile,
		@Req() req: Request
	) {
		try {
			return this.filesService.addFile(req.auth!.username, filename, file.buffer, file.mimetype);
		} catch (e) {
			switch (e) {
				default:
					throw new InternalServerError((e as Error).message)
			}
		}
	}

	@Delete("/:id")
	@Returns(204).ContentType("text/plain")
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Protected()
	async deleteFile(
		@PathParams("id") id: string,
		@Req() {auth}: Request
	) {
		try {
			return this.filesService.deleteFile(auth!.username, id);
		} catch (e) {
			switch (e) {
				case FileService.exceptions.fileNotFound:
					throw new NotFound("Could not find file specified")
				case FileService.exceptions.notAuthorized:
					throw new Forbidden("This is not your file !!!")
				default:
					throw new InternalServerError((e as Error).message)
			}
		}
	}

}


