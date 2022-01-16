import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { container } from "../../../core/di";
import { DiKeysService } from "../../../core/di/di.keys.service";
import { FilesService } from "../../../core/services/files.service";
import { push } from "connected-react-router";
import { routes } from "../../../config/routes";
import { FileOwner, VisualisationMode } from "./files.reducer";
import { StoreState } from "../../index";

const service = container.get<FilesService>(DiKeysService.files);

export const getFiles = createAsyncThunk("files/getUserFiles", async (type: FileOwner) => {
	return { data: await service[type].list(), owner: type };
});

export const addFile = createAsyncThunk("files/addFile", async (params: { owner: FileOwner; filename: string; location: string; file: File }, { dispatch }) => {
	await service[params.owner].add(params.filename, params.location, params.file);
	await dispatch(getFiles(params.owner));
	await dispatch(push(routes.home));
});

export const deleteFile = createAsyncThunk("files/deleteFile", async (params: { owner: FileOwner; fileId: string }, { dispatch }) => {
	await service[params.owner].delete(params.fileId);
	await dispatch(getFiles(params.owner));
});

export const deleteFolder = createAsyncThunk("files/deleteFile", async (params: { owner: FileOwner; path: string }, { dispatch, getState }) => {
	const { files } = getState() as StoreState;

	const filesInFolder = files[params.owner].filter((file) => file.location.includes(params.path));

	await Promise.all(filesInFolder.map((file) => service[params.owner].delete(file.id)));

	await dispatch(getFiles(params.owner));
});

export const setVisualisationMode = createAction<{ owner: FileOwner; mode: VisualisationMode }>("files/changeVisualisationMode");
