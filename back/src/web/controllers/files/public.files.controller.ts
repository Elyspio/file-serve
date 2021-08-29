import {Controller, Delete, Get, MultipartFile, PathParams, PlatformMulterFile, Post} from "@tsed/common";
import {Description, Name, Required, Returns} from "@tsed/schema";
import {Log} from "../../../core/utils/decorators/logger";
import {getLogger} from "../../../core/utils/logger";
import {Inject} from "@tsed/di";
import {FileService} from "../../../core/services/file.service";
import {NotFound} from "@tsed/exceptions";
import {InternalServerError} from "@tsed/exceptions/lib/serverErrors";
import {FileModel, FileModelWithContent} from "./file.model";

@Controller("/files/public")
@Name("Public")
export class PublicFilesController {

	private static log = getLogger.controller(PublicFilesController);

	@Inject()
	private filesService: FileService

	@Get("/")
	@Returns(200, Array).Of(FileModel)
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Log(PublicFilesController.log)
	@Description("Get all common files name")
	async listFiles() {
		try {
			return this.filesService.listCommonFiles()
		} catch (e: any) {
			throw new InternalServerError((e as Error).message)
		}
	}

	@Get("/:id")
	@Returns(200, FileModelWithContent)
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Description("Get the content of a file without authentication")
	@Log(PublicFilesController.log)
	async getFile(
		@PathParams("id") id: string
	) {
		try {
			return this.filesService.getCommonFile(id)
		} catch (e: any) {
			if (e === FileService.exceptions.fileNotFound) throw new NotFound("Could not find file specified")
			throw new InternalServerError((e as Error).message)
		}
	}


	@Get("/:id/content")
	@Returns(200, String)
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Description("Get the content of a file without authentication")
	@Log(PublicFilesController.log)
	async getFileContent(
		@PathParams("id") id: string
	) {
		try {
			return this.filesService.getCommonFileContent(id)
		} catch (e: any) {
			if (e === FileService.exceptions.fileNotFound) throw new NotFound("Could not find file specified")
			throw new InternalServerError((e as Error).message)
		}
	}


	@Post("/:filename")
	@Returns(201, Number).ContentType("text/plain")
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	async addFile(
		@PathParams("filename") filename: string,
		@Required() @MultipartFile("file") file: PlatformMulterFile
	) {
		try {
			return this.filesService.addCommonFile(filename, file.buffer, file.mimetype);
		} catch (e) {
			throw new InternalServerError((e as Error).message)
		}
	}

	@Delete("/:id")
	@Returns(204)
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	async deleteFile(
		@PathParams("id") id: string
	) {
		try {
			await this.filesService.deleteCommonFile(id);
		} catch (e) {
			if (e === FileService.exceptions.fileNotFound) throw new NotFound("Could not find file specified")
			throw new InternalServerError((e as Error).message)
		}
	}

}


