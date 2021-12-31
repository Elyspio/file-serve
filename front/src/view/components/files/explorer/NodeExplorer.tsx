import { useInjection } from "inversify-react";
import { FilesService } from "../../../../core/services/files.service";
import { DiKeysService } from "../../../../core/di/di.keys.service";
import React from "react";
import { Button, Grid, Menu, MenuItem, Popover, Typography, useTheme } from "@mui/material";
import { Folder, InsertDriveFile } from "@mui/icons-material";
import { NodeElem } from "../../../../core/services/files.explorer.service";
import { useAppSelector } from "../../../../store";
import { useDispatch } from "react-redux";
import { deleteFile } from "../../../../store/module/files/files.action";

type NodeExplorerParams = { node: NodeElem; setCurrent: (node: NodeElem) => void; owner: "public" | "user" };

export function NodeExplorer({ node, setCurrent, owner }: NodeExplorerParams) {
	const services = {
		files: useInjection<FilesService>(DiKeysService.files),
	};

	const click = React.useCallback(async () => {
		if (node.type === "folder") setCurrent(node);
		else {
			await services.files[owner].download(node.data.id);
		}
	}, [node, setCurrent, owner, services.files]);

	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const [contextMenu, setContextMenu] = React.useState<{
		mouseX: number;
		mouseY: number;
	} | null>(null);

	const handleContextMenu = (event: React.MouseEvent) => {
		if (node.type === "file") {
			event.preventDefault();
			setContextMenu(
				contextMenu === null
					? {
							mouseX: event.clientX - 2,
							mouseY: event.clientY - 4,
					  }
					: // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
					  // Other native context menus might behave different.
					  // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
					  null
			);
		}
	};

	const handleClose = React.useCallback(() => {
		setContextMenu(null);
	}, []);

	const dispatch = useDispatch();

	const handleDelete = React.useCallback(() => {
		if (node.type === "file") {
			handleClose();
			dispatch(deleteFile({ fileId: node.data.id, type: owner }));
		}
	}, [node, owner, dispatch, handleClose]);

	const handleDownload = React.useCallback(async () => {
		if (node.type === "file") {
			handleClose();
			await services.files[owner].download(node.data.id);
		}
	}, [node, owner, services.files, handleClose]);

	const handleView = React.useCallback(async () => {
		if (node.type === "file") {
			handleClose();
			// TODO JGD set in store the viewed element
		}
	}, [node, handleClose]);

	const open = Boolean(anchorEl);

	const theme = useTheme();

	const logged = useAppSelector((s) => s.authentication.logged);

	return (
		<>
			<Button onClick={click} color={"inherit"} sx={{ textTransform: "none" }} onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
				<Grid container direction={"column"} spacing={1} alignItems={"center"}>
					<Grid item xs>
						{node.type === "file" && <InsertDriveFile />}
						{node.type === "folder" && <Folder />}
					</Grid>
					<Grid item onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} xs>
						<Typography maxWidth={"15ch"} noWrap variant={"body2"}>
							{node.path}
						</Typography>
					</Grid>
				</Grid>
			</Button>
			<Popover
				id={"popover-title-node-explorer-" + node.path}
				sx={{
					pointerEvents: "none",
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
			>
				<Typography sx={{ p: 1 }}>{node.path}</Typography>
			</Popover>
			<Menu
				open={contextMenu !== null}
				onClose={handleClose}
				anchorReference="anchorPosition"
				anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
			>
				{logged && (
					<MenuItem onClick={handleDelete} sx={{ color: theme.palette.error.main }}>
						Delete
					</MenuItem>
				)}

				<MenuItem onClick={handleView}>View</MenuItem>
				<MenuItem onClick={handleDownload}>Download</MenuItem>
			</Menu>
		</>
	);
}