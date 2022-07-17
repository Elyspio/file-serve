import React, { ReactElement } from "react";
import { Menu, MenuItem, useTheme } from "@mui/material";
import { ContextMenuPosition } from "./NodeExplorer";
import { NodeElem } from "../../../../../core/services/files.explorer.service";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import { copyFileLink, deleteFile, deleteFolder, downloadFile, setFileVisibility } from "../../../../../store/module/files/files.action";
import { FileOwner } from "../../../../../store/module/files/files.reducer";

type NodeContextMenuProps = {
	position: ContextMenuPosition | null;
	node: NodeElem;
	close: () => void;
	owner: FileOwner;
};

export function NodeContextMenu({ position, node, close, owner }: NodeContextMenuProps) {
	const { logged } = useAppSelector((s) => s.authentication);
	const theme = useTheme();
	const dispatch = useAppDispatch();

	const handleDelete = React.useCallback(() => {
		close();
		if (node.type === "file") {
			dispatch(deleteFile({ fileId: node.data.id, owner: owner }));
		} else {
			dispatch(deleteFolder({ owner, path: node.path }));
		}
	}, [node, owner, dispatch, close]);

	const handleDownload = React.useCallback(async () => {
		if (node.type === "file") {
			close();
			await dispatch(downloadFile({ fileId: node.data.id, owner }));
		}
	}, [node, owner, dispatch, close]);

	const handleView = React.useCallback(async () => {
		if (node.type === "file") {
			close();
			// TODO JGD set in store the viewed element
		}
	}, [node, close]);

	const handleHide = React.useCallback(async () => {
		if (node.type === "file") {
			close();
			dispatch(setFileVisibility({ fileId: node.data.id, owner }));
		}
	}, [node, close, dispatch, owner]);

	const handleGetLink = React.useCallback(async () => {
		if (node.type === "file") {
			await dispatch(copyFileLink({ fileId: node.data.id, owner }));
		}
		close();
	}, [node, close, dispatch, owner]);

	const menuItems = React.useMemo(() => {
		const items = [] as ReactElement[];
		if (node.type === "file") {
			items.push(
				<MenuItem key={"view"} onClick={handleView}>
					View
				</MenuItem>,
				<MenuItem key={"download"} onClick={handleDownload}>
					Download
				</MenuItem>,
				<MenuItem key={"link"} onClick={handleGetLink}>
					Get Link
				</MenuItem>
			);
		}

		if (logged) {
			if (node.type === "file")
				items.push(
					<MenuItem key={"hide"} onClick={handleHide}>
						{node.hidden ? "Reveal" : "Hide"}
					</MenuItem>
				);
			items.push(
				<MenuItem key={"delete"} onClick={handleDelete} sx={{ color: theme.palette.error.main }}>
					Delete
				</MenuItem>
			);
		}

		return items;
	}, [handleDelete, handleHide, handleDownload, handleView, handleGetLink, theme, logged, node]);

	const anchorPosition = React.useMemo(
		() =>
			position
				? {
						top: position.mouseY,
						left: position.mouseX,
				  }
				: undefined,
		[position]
	);

	return (
		<Menu open={position !== null} onClose={close} anchorReference="anchorPosition" anchorPosition={anchorPosition}>
			{menuItems}
		</Menu>
	);
}
