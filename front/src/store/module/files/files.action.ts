import { createAsyncThunk } from "@reduxjs/toolkit";
import { container } from "../../../core/di";
import { DiKeysService } from "../../../core/di/di.keys.service";
import { FilesService } from "../../../core/services/files.service";
import { push } from "connected-react-router";
import { routes } from "../../../config/routes";

const service = container.get<FilesService>(DiKeysService.files);

export const getFiles = createAsyncThunk("files/getUserFiles", async (type: "user" | "public") => {
	return { data: await service[type].list(), type };
});

export const addFile = createAsyncThunk("files/addFile", async (params: { type: "user" | "public"; filename: string; location: string; file: File }, { dispatch }) => {
	await service[params.type].add(params.filename, params.location, params.file);
	await dispatch(getFiles(params.type));
	await dispatch(push(routes.home));
});

export const deleteFile = createAsyncThunk("files/deleteFile", async (params: { type: "user" | "public"; fileId: string }, { dispatch }) => {
	await service[params.type].delete(params.fileId);
	await dispatch(getFiles(params.type));
});
