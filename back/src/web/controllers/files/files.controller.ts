import {Controller, Get, MultipartFile, PathParams, PlatformMulterFile, Post, Req} from "@tsed/common";
import {Description, Name, Required, Returns} from "@tsed/schema";
import {Log} from "../../../core/utils/decorators/logger";
import {getLogger} from "../../../core/utils/logger";
import {Inject} from "@tsed/di";
import {FilesService} from "../../../core/services/filesService";
import {NotFound} from "@tsed/exceptions";
import {InternalServerError} from "@tsed/exceptions/lib/serverErrors";
import {Request} from "express";
import {Protected} from "../../decorators/protected";

@Controller("/files")
@Name("Files")
export class FilesController {

	private static log = getLogger.controller(FilesController);

	@Inject()
	private filesService: FilesService

	// region list


	@Get("/")
	@Returns(200, Array).Of(String)
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
	@Returns(200, Array).Of(String)
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


	@Get("/:filename")
	@Returns(200, String).ContentType("text/plain")
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Description("Get the content of a file without authentication")
	@Log(FilesController.log)
	async getCommonFile(@PathParams() filename) {
		try {
			return this.filesService.getCommonFile(filename)
		} catch (e: any) {
			if (e === FilesService.exceptions.fileNotFound) throw new NotFound("Could not find file specified")
			throw new InternalServerError((e as Error).message)
		}
	}


	@Get("/user/:filename")
	@Returns(200, String).ContentType("text/plain")
	@Returns(404, NotFound).Description("File not found")
	@Log(FilesController.log)
	@Description("Get the content of a file of the logged user")
	@Protected()
	async getUserFile(@PathParams() filename, @Req() req: Request) {
		try {
			return this.filesService.getFileContent(req.auth!.username, filename)
		} catch (e: any) {
			if (e === FilesService.exceptions.fileNotFound) throw new NotFound("Could not find file specified")
			throw new InternalServerError((e as Error).message)
		}
	}

	// endregion


	// region add

	@Post("/:filename")
	@Returns(201, Number).ContentType("text/plain")
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	async addCommonFile(@PathParams() filename, @Required() @MultipartFile("file") file: PlatformMulterFile) {
		return this.filesService.addCommonFile(filename, file.buffer);
	}

	@Post("/user/:filename")
	@Returns(201, Number).ContentType("text/plain")
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Protected()
	async addUserFile(@PathParams() filename, @Required() @MultipartFile("file") file: PlatformMulterFile, @Req() req: Request) {
		return this.filesService.addFile(req.auth!.username, filename, file.buffer);
	}

	// endregion


}


