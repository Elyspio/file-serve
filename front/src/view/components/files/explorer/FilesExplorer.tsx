import React from "react";
import { FileModel } from "../../../../core/apis/backend/generated";
import { useInjection } from "inversify-react";
import { FilesExplorerService, NodeElem, NodeFolder } from "../../../../core/services/files.explorer.service";
import { DiKeysService } from "../../../../core/di/di.keys.service";
import { Grid, IconButton } from "@mui/material";
import { Add, ArrowBack } from "@mui/icons-material";
import { NodeExplorer } from "./NodeExplorer";
import { FilesBreadcrumb } from "./FilesBreadcrumb";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { routes } from "../../../../config/routes";
import { push } from "connected-react-router";

interface FileExplorerProps {
	files: FileModel[];
	owner: "public" | "user";
}

export function FilesExplorer({ files, owner }: FileExplorerProps) {
	const services = {
		explorer: useInjection<FilesExplorerService>(DiKeysService.filesExplorer),
	};

	const dispatch = useAppDispatch();

	let root = React.useMemo(() => services.explorer.convert(files), [services.explorer, files]);
	const [current, setCurrent] = React.useState<NodeElem>(root);

	React.useEffect(() => {
		setCurrent(root);
	}, [root]);

	const goBack = React.useCallback(() => {
		if (current.parent) setCurrent(current.parent);
	}, [current.parent]);

	const goIn = React.useCallback((node: NodeElem) => {
		setCurrent(node);
	}, []);

	const nodes = React.useMemo(() => {
		const nodes = [...(current as NodeFolder).nodes];
		nodes.sort((a, b) => {
			if (a.owner === b.owner) return a.path.localeCompare(b.path);
			if (a.owner === "folder" && b.owner === "file") return -1;
			if (a.owner === "file" && b.owner === "folder") return 1;
			return a.id < b.id ? -1 : 1;
		});
		return nodes;
	}, [current]);

	const [contextMenu, setContextMenu] = React.useState<{
		mouseX: number;
		mouseY: number;
	} | null>(null);

	const handleContextMenu = (event: React.MouseEvent) => {
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
	};

	const handleClose = React.useCallback(() => {
		setContextMenu(null);
	}, []);

	const addFile = React.useCallback(() => {
		handleClose();
		dispatch(push({ pathname: routes.addFile, state: { user: owner === "user", location: current.path } }));
	}, [handleClose, dispatch, current.path, owner]);

	const visualisationModes = useAppSelector((s) => s.files.visualisation);

	const visualisationMode = React.useMemo(() => visualisationModes[owner], [visualisationModes, owner]);

	if (files.length === 0) return null;

	let inline = visualisationMode === "list";

	return (
		<Grid className={"FilesExplorer"} container direction={!inline ? "column" : "row"} p={1} onContextMenu={handleContextMenu}>
			<Grid item p={1} bgcolor={"background.default"} container alignItems={"center"}>
				<Grid item xs={true}>
					<FilesBreadcrumb root={root} setCurrent={goIn} current={current} />
				</Grid>
				<Grid item xs={1} mr={1} ml={inline ? 1 : undefined}>
					<IconButton onClick={addFile}>
						<Add />
					</IconButton>
				</Grid>
			</Grid>

			<Grid container direction={inline ? "column" : "row"} item spacing={2} alignItems={inline ? "flex-start" : "center"} my={1}>
				{current.id !== root.id && (
					<Grid item>
						<IconButton onClick={goBack}>
							<ArrowBack />
						</IconButton>
					</Grid>
				)}

				{nodes.map((node) => {
					return (
						<Grid item key={node.id} width={inline ? "100%" : undefined}>
							<NodeExplorer inline={inline} owner={owner} node={node} setCurrent={goIn} />
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
}
