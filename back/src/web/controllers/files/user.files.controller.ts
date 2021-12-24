import { BodyParams, Controller, Delete, Get, MultipartFile, PathParams, PlatformMulterFile, Post, Req, Res } from "@tsed/common";
import { Description, Name, Required, Returns } from "@tsed/schema";
import { Log } from "../../../core/utils/decorators/logger";
import { getLogger } from "../../../core/utils/logger";
import { Inject } from "@tsed/di";
import { FileService } from "../../../core/services/file.service";
import { NotFound, Unauthorized } from "@tsed/exceptions";
import { InternalServerError } from "@tsed/exceptions/lib/serverErrors";
import { Request, Response } from "express";
import { Protected } from "../../decorators/protected";
import { AddFileBinary, FileModel, FileModelWithContent } from "./file.model";
import { Forbidden } from "@tsed/exceptions/lib/clientErrors";

@Controller("/files/user")
@Name("User")
export class UserFilesController {
	private static log = getLogger.controller(UserFilesController);

	@Inject()
	private filesService: FileService;

	@Get("/")
	@Returns(200, Array).Of(FileModel)
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Description("Get all files for the logged user")
	@Protected()
	@Log(UserFilesController.log, { arguments: false, level: "info" })
	async listFiles(@Req() { auth }: Request) {
		try {
			return this.filesService.listFiles(auth!.username);
		} catch (e: any) {
			throw new InternalServerError((e as Error).message);
		}
	}

	@Get("/:id")
	@Returns(200, FileModelWithContent)
	@Returns(404, NotFound).Description("File not found")
	@Log(UserFilesController.log, { arguments: false, level: "info" })
	@Description("Get the content of a file of the logged user")
	@Protected()
	async getFile(@PathParams("id") id: string, @Req() { auth }: Request): Promise<FileModelWithContent> {
		try {
			const { file, buffer } = await this.filesService.getFile(auth!.username, id);
			return {
				id: file.id,
				mime: file.mime,
				name: file.name,
				content: [...new Uint8Array(buffer)],
			};
		} catch (e: any) {
			switch (e) {
				case FileService.exceptions.fileNotFound:
					throw new NotFound("Could not find file specified");
				case FileService.exceptions.notAuthorized:
					throw new Forbidden("This is not your file !!!");
				default:
					throw new InternalServerError((e as Error).message);
			}
		}
	}

	@Get("/:id/content")
	@Returns(200, String).ContentType("text/plain")
	@Returns(NotFound.STATUS, NotFound).Description("File not found")
	@Returns(Unauthorized.STATUS, Unauthorized).Description("File not found")
	@Log(UserFilesController.log, { arguments: false, level: "info" })
	@Description("Get the content of a file of the logged user")
	@Protected()
	async getFileContent(@PathParams("id") id: string, @Req() { auth }: Request) {
		try {
			const file = await this.filesService.getFileContent(auth!.username, id);
			return file.buffer;
		} catch (e: any) {
			switch (e) {
				case FileService.exceptions.fileNotFound:
					throw new NotFound("Could not find file specified");
				case FileService.exceptions.notAuthorized:
					throw new Unauthorized("This is not your file !!!");
				default:
					throw new InternalServerError((e as Error).message);
			}
		}
	}

	@Get("/:id/stream")
	@Returns(206)
	@Returns(NotFound.STATUS, NotFound).Description("File not found")
	@Returns(Unauthorized.STATUS, Unauthorized).Description("File is not yours")
	@Log(UserFilesController.log, { arguments: false, level: "info" })
	@Description("Get the content of a file of the logged user as a stream")
	@Protected()
	async streamFile(@PathParams("id") id: string, @Req() { auth, headers }: Request, @Res() res: Response) {
		try {
			const { stream, length, mime } = await this.filesService.getFileStream(auth!.username, id);
			const range = headers.range;

			if (range) {
				const parts = range.replace(/bytes=/, "").split("-");
				const start = parseInt(parts[0], 10);
				const end = parts[1] ? parseInt(parts[1], 10) : length - 1;

				if (start >= length) {
					res.status(416).send("Requested range not satisfiable\n" + start + " >= " + length);
					return;
				}

				const chunksize = end - start + 1;
				const head = {
					"Content-Range": `bytes ${start}-${end}/${length}`,
					"Accept-Ranges": "bytes",
					"Content-Length": chunksize,
					"Content-Type": mime,
				};

				res.writeHead(206, head);
				stream.pipe(res);
			} else {
				const head = {
					"Content-Length": length,
					"Content-Type": mime,
				};
				res.writeHead(200, head);
				stream.pipe(res);
			}
		} catch (e: any) {
			switch (e) {
				case FileService.exceptions.fileNotFound:
					throw new NotFound("Could not find file specified");
				case FileService.exceptions.notAuthorized:
					throw new Unauthorized("This is not your file !!!");
				default:
					throw new InternalServerError((e as Error).message);
			}
		}
	}

	@Post("/")
	@Returns(201, Number).ContentType("text/plain")
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Protected()
	@Log(UserFilesController.log, { arguments: false, level: "info" })
	async addFile(@Required() @MultipartFile("file") file: PlatformMulterFile, @Req() req: Request) {
		try {
			return this.filesService.addFile(req.auth!.username, file.filename, Buffer.from(new Uint8Array(file.buffer)), file.mimetype);
		} catch (e) {
			switch (e) {
				default:
					throw new InternalServerError((e as Error).message);
			}
		}
	}

	@Post("/bytes")
	@Returns(201, Number).ContentType("text/plain")
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Protected()
	@Log(UserFilesController.log, { arguments: false, level: "info" })
	async addFileFromBytes(@Required() @BodyParams() file: AddFileBinary, @Req() req: Request) {
		try {
			return this.filesService.addFileFromBytes(req.auth!.username, file.name, file.content, file.mime);
		} catch (e) {
			switch (e) {
				default:
					throw new InternalServerError((e as Error).message);
			}
		}
	}

	@Delete("/:id")
	@Returns(204).ContentType("text/plain")
	@Returns(404, NotFound).Description("File not found")
	@Returns(500, InternalServerError).Description("Unexpected error")
	@Protected()
	@Log(UserFilesController.log, { arguments: false, level: "info" })
	async deleteFile(@PathParams("id") id: string, @Req() { auth }: Request) {
		try {
			return this.filesService.deleteFile(auth!.username, id);
		} catch (e) {
			switch (e) {
				case FileService.exceptions.fileNotFound:
					throw new NotFound("Could not find file specified");
				case FileService.exceptions.notAuthorized:
					throw new Forbidden("This is not your file !!!");
				default:
					throw new InternalServerError((e as Error).message);
			}
		}
	}
}
