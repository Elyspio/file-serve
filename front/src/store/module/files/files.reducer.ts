import { createReducer } from "@reduxjs/toolkit";
import { getFiles } from "./files.action";
import { FileModel } from "../../../core/apis/backend/generated";

export interface ThemeState {
	public: FileModel[];
	user: FileModel[];
}

const defaultState: ThemeState = {
	public: [],
	user: [],
};

export const filesReducer = createReducer(defaultState, (builder) => {
	builder.addCase(getFiles.fulfilled, (state, action) => {
		state[action.payload.type] = action.payload.data;
	});
});
