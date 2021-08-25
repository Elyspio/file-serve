import {Controller, Delete, Get, MultipartFile, PathParams, PlatformMulterFile, Post, Req} from "@tsed/common";
import {Description, Name, Required, Returns} from "@tsed/schema";
import {Log} from "../../../core/utils/decorators/logger";
import {getLogger} from "../../../core/utils/logger";
import {Inject} from "@tsed/di";
import {FileService} from "../../../core/services/file.service";
import {NotFound} from "@tsed/exceptions";
import {InternalServerError} from "@tsed/exceptions/lib/serverErrors";
import {Request} from "express";
import {Protected} from "../../decorators/protected";
import {FileModel} from "./file.model";
import {Forbidden} from "@tsed/exceptions/lib/clientErrors";

@Controller("/files")
@Name("Files")
export class FilesController {

	private static log = getLogger.controller(FilesController);

	@Inject()
	private filesService: FileService

	// region list


	@Get("/")
	@Returns(200, Array).Of(FileModel)
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Log(FilesController.log)
	@Description("Get all common files name")
	async listCommonFiles() {
		try {
			return this.filesService.listCommonFiles()
		} catch (e: any) {
			throw new InternalServerError((e as Error).message)
		}
	}

	@Get("/user")
	@Returns(200, Array).Of(FileModel)
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Description("Get all files for the logged user")
	@Protected()
	@Log(FilesController.log)
	async listUserFiles(@Req() {auth}: Request) {
		try {
			return this.filesService.listFiles(auth!.username)
		} catch (e: any) {
			throw new InternalServerError((e as Error).message)
		}
	}

	// endregion

	// region get


	@Get("/:id")
	@Returns(200, String).ContentType("text/plain")
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Description("Get the content of a file without authentication")
	@Log(FilesController.log)
	async getCommonFile(@PathParams("id") id: string) {
		try {
			return this.filesService.getCommonFile(id)
		} catch (e: any) {
			if (e === FileService.exceptions.fileNotFound) throw new NotFound("Could not find file specified")
			throw new InternalServerError((e as Error).message)
		}
	}


	@Get("/user/:id")
	@Returns(200, String).ContentType("text/plain")
	@Returns(404, NotFound).Description("File not found")
	@Log(FilesController.log)
	@Description("Get the content of a file of the logged user")
	@Protected()
	async getUserFile(@PathParams("id") id: string, @Req() req: Request) {
		try {
			return this.filesService.getFileContent(id)
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

	// endregion

	// region add

	@Post("/:filename")
	@Returns(201, Number).ContentType("text/plain")
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	async addCommonFile(@PathParams("filename") filename: string, @Required() @MultipartFile("file") file: PlatformMulterFile) {
		try {
			return this.filesService.addCommonFile(filename, file.buffer);
		} catch (e) {
			throw new InternalServerError((e as Error).message)
		}
	}

	@Post("/user/:filename")
	@Returns(201, Number).ContentType("text/plain")
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Protected()
	async addUserFile(@PathParams("filename") filename: string, @Required() @MultipartFile("file") file: PlatformMulterFile, @Req() req: Request) {
		try {
			return this.filesService.addFile(req.auth!.username, filename, file.buffer);
		} catch (e) {
			switch (e) {
				default:
					throw new InternalServerError((e as Error).message)
			}
		}
	}

	// endregion

	// region delete

	@Delete("/:id")
	@Returns(204)
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	async deleteCommonFile(@PathParams("id") id: string) {
		try {
			await this.filesService.deleteCommonFile(id);
		} catch (e) {
			if (e === FileService.exceptions.fileNotFound) throw new NotFound("Could not find file specified")
			throw new InternalServerError((e as Error).message)
		}
	}

	@Delete("/user/:id")
	@Returns(204).ContentType("text/plain")
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Protected()
	async deleteUserFile(@PathParams("id") id: string, @Req() req: Request) {
		try {
			return this.filesService.deleteFile(id);
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

	// endregion


}


