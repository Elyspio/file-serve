import React, { useRef } from "react";
import { Button, ClickAwayListener, Grid, Popover, Typography } from "@mui/material";
import { Folder, InsertDriveFile } from "@mui/icons-material";
import { NodeElem } from "../../../../../core/services/files.explorer.service";
import { NodeContextMenu } from "./NodeContextMenu";
import { downloadFile } from "../../../../../store/module/files/files.action";
import { useAppDispatch } from "../../../../../store";

type NodeExplorerParams = { node: NodeElem; setCurrent: (node: NodeElem) => void; owner: "public" | "user"; inline?: boolean };

export type ContextMenuPosition = {
	mouseX: number;
	mouseY: number;
};

export function NodeExplorer({ node, setCurrent, owner, inline }: NodeExplorerParams) {
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [contextMenu, setContextMenu] = React.useState<ContextMenuPosition | null>(null);

	const dispatch = useAppDispatch();

	const nameRef = useRef<HTMLElement>(null);

	const click = React.useCallback(async () => {
		if (node.type === "folder") setCurrent(node);
		else {
			dispatch(downloadFile({ fileId: node.data.id, owner }));
		}
	}, [node, setCurrent, owner, dispatch]);

	const handleContextMenu = (event: React.MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		handlePopoverClose();
		setContextMenu(
			contextMenu === null
				? {
						mouseX: event.clientX - 2,
						mouseY: event.clientY - 4,
				  }
				: null
		);
	};

	const handleClose = React.useCallback(() => {
		setContextMenu(null);
	}, []);

	const open = Boolean(anchorEl);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		const e = event.currentTarget;
		if (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) {
			setAnchorEl(event.currentTarget);
		}
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	return (
		<ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClose}>
			<>
				<Button
					onClick={click}
					color={"inherit"}
					sx={{
						textTransform: "none",
						cursor: "contextMenu",
						width: "100%",
						opacity: node.hidden ? 0.3 : 1,
					}}
					onContextMenu={handleContextMenu}
				>
					{inline ? (
						<Grid container spacing={2} alignItems={"center"}>
							<Grid item xs={1}>
								{node.type === "file" && <InsertDriveFile sx={{ color: "lightgray" }} />}
								{node.type === "folder" && <Folder sx={{ color: "#F7D366" }} />}
							</Grid>
							<Grid item xs={11}>
								<Typography ref={nameRef} textAlign={"left"} variant={"body2"} noWrap onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
									{node.path}
								</Typography>
							</Grid>
						</Grid>
					) : (
						<Grid container direction={"column"} spacing={1} alignItems={"center"} justifyContent={"center"}>
							<Grid item xs>
								{node.type === "file" && <InsertDriveFile sx={{ color: "lightgray" }} />}
								{node.type === "folder" && <Folder sx={{ color: "#F7D366" }} />}
							</Grid>
							<Grid item onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} xs>
								<Typography ref={nameRef} maxWidth={"15ch"} noWrap variant={"body2"}>
									{node.path}
								</Typography>
							</Grid>
						</Grid>
					)}
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
				<NodeContextMenu node={node} close={handleClose} owner={owner} position={contextMenu} />
			</>
		</ClickAwayListener>
	);
}
