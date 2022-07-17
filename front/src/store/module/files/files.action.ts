import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { container } from "../../../core/di";
import { FilesService } from "../../../core/services/files.service";
import { push } from "redux-first-history";
import { routes } from "../../../config/routes";
import { FileOwner, VisualisationMode } from "./files.reducer";
import { ExtraArgument, StoreState } from "../../index";
import { toast } from "react-toastify";
import { FileData } from "../../../core/apis/backend/generated";

const service = container.get(FilesService);

type GetFileParam = { owner: FileOwner; notify?: boolean };
export const getFiles = createAsyncThunk("files/getUserFiles", async ({ owner, notify = true }: GetFileParam) => {
	let promise = service[owner].list();

	let data: FileData[];

	if (notify) {
		data = await toast.promise(promise, {
			error: `Could not load ${owner} files`,
			pending: `Loading ${owner} files`,
			success: `Loaded ${owner} files`,
		});
	} else {
		data = await promise;
	}

	return { data, owner };
});

type AddParams = { owner: FileOwner; filename: string; location: string; file: File; hidden: boolean };
export const addFile = createAsyncThunk("files/addFile", async (params: AddParams, { dispatch }) => {
	await service[params.owner].add(params.filename, params.location, params.file, params.hidden);
	await dispatch(getFiles({ owner: params.owner, notify: false }));
	await dispatch(push(routes.home));
});

type FileParam = { owner: FileOwner; fileId: string };
type DeleteFileParam = FileParam;
export const deleteFile = createAsyncThunk("files/deleteFile", async ({ fileId, owner }: DeleteFileParam, { dispatch, getState }) => {
	const { files } = getState() as StoreState;

	const file = files[owner].find((f) => f.id === fileId)!;

	await toast.promise(service[owner].delete(fileId), {
		error: `Could not delete file "${file.filename}" (${owner})`,
		pending: `Deleting file "${file.filename}" (${owner})`,
		success: `File "${file.filename}" (${owner}) deleted`,
	});

	await dispatch(getFiles({ owner, notify: false }));
});

type DeleteFolderParam = { owner: FileOwner; path: string };
export const deleteFolder = createAsyncThunk("files/deleteFile", async ({ owner, path }: DeleteFolderParam, { dispatch, getState }) => {
	const { files } = getState() as StoreState;

	const filesInFolder = files[owner].filter((file) => file.location.includes(path));

	await toast.promise(Promise.all(filesInFolder.map((file) => service[owner].delete(file.id))), {
		error: `Could not delete folder "${path}" (${owner})`,
		pending: `Deleting folder "${path}" (${owner})`,
		success: `Folder "${path}" (${owner}) deleted`,
	});

	await dispatch(getFiles({ owner, notify: false }));
});

type SetFileVisibilityParam = FileParam;
export const setFileVisibility = createAsyncThunk("files/setFileVisibility", async ({ fileId, owner }: SetFileVisibilityParam, { extra, getState, dispatch }) => {
	const {
		files,
		authentication: { logged },
	} = getState() as StoreState;

	const file = files[owner].find((f) => f.id === fileId)!;

	const { container } = extra as ExtraArgument;
	const service = container.get(FilesService);
	const promise = service[owner].toggleVisibility(fileId);

	const verb = file.hidden ? "reveal" : "hide";

	const verbIng = file.hidden ? "Revealing" : "Hiding";

	const verbEd = file.hidden ? "revealed" : "hided";

	await toast.promise(promise, {
		error: `Could not ${verb} file "${file.filename}"`,
		pending: `${verbIng} file "${file.filename}"`,
		success: `File "${file.filename}" ${verbEd}`,
	});

	await dispatch(getFiles({ owner, notify: false }));
});

type DownloadFileParam = FileParam;

export const downloadFile = createAsyncThunk("files/downloadFile", async ({ fileId, owner }: DownloadFileParam, { extra }) => {
	const { container } = extra as ExtraArgument;
	const service = container.get(FilesService);
	await service[owner].download(fileId);
});

export const copyFileLink = createAsyncThunk("files/copyFileLink", async ({ fileId, owner }: DownloadFileParam, { extra }) => {
	const { container } = extra as ExtraArgument;
	const service = container.get(FilesService);
	await service[owner].getLink(fileId);
});

export const setVisualisationMode = createAction<{ owner: FileOwner; mode: VisualisationMode }>("files/changeVisualisationMode");
