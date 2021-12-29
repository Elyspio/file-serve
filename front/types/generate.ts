const { EOL } = require("os");
const { execSync } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

type NSwagConf = {
	//  Fichier de configuration nswag
	file: string;
	//  url du Swagger.json
	input: string;
	// fichier de destination (généré)
	outputFile: string;
	// fichier de configuration de l'authentification (contenant les classes AuthorizedApiBase et IConfig)
	authFile: string;
};

function generateFromNswag({ authFile, outputFile, file, input }: NSwagConf) {
	const command = `nswag run ${file} /variables:INPUT_URL=${input},OUTPUT_FILE=${outputFile}`;
	const {
		codeGenerators: {
			openApiToTypeScriptClient: { clientBaseClass, configurationClass },
		},
	} = JSON.parse(readFileSync(file).toString());
	console.log("codeGenerators json read ok");
	execSync(command);
	console.log("exec command ok");
	// let relativePathFromGeneratedSrc = path.relative(path.dirname(outputFile), authFile).replace(/\\/g, "/");
	// // Si on est dans le même repertoire on ajoute "./"
	// if (relativePathFromGeneratedSrc[0] !== ".") {
	// 	relativePathFromGeneratedSrc = `./${relativePathFromGeneratedSrc}`;
	// }
	// // on enleve l'extension
	// if (relativePathFromGeneratedSrc.slice(-3) === ".ts") {
	// 	relativePathFromGeneratedSrc = relativePathFromGeneratedSrc.slice(0, -3);
	// }
	// let text = readFileSync(outputFile).toString();
	// text = [`import {${clientBaseClass}, ${configurationClass}} from "${relativePathFromGeneratedSrc}"`, text].join(EOL);
	// writeFileSync(outputFile, text);
}

if (require.main === module) {
	console.log("Generating http client for Backend Api");
	try {
		generateFromNswag({
			input: "http://localhost:4003/swagger/v1/swagger.json",
			file: path.resolve(__dirname, "nswag.json"),
			outputFile: path.resolve(__dirname, "..", "src", "core", "apis", "backend", "generated.ts"),
			authFile: path.resolve(__dirname, "..", "src", "core", "apis", "authorization.ts"),
		});
	} catch (e) {
		console.error(e);
	}
}
