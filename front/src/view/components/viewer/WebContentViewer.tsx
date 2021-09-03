import React from 'react';
import "./JsonViewer.scss"
import {FileModelWithContent} from "../../../core/apis/backend/generated";

type Props = {
	/**
	 * base64 encoded content
	 */
	content: FileModelWithContent["content"],
	mime: string,
}

export function WebContentViewer({content, mime}: Props) {
	return <div className={"WebContentViewer"} style={{width: "100%", height: "100%"}}>
		<iframe src={`data:${mime};base64,${content}`} style={{width: "100%", height: "99%"}} frameBorder="0" title={"web-content-viewer-" + content.slice(0, 10)}/>
	</div>;
}
