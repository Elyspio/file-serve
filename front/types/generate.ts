const { execSync } = require("child_process");
const path = require("path");

type NSwagConf = {
	//  Fichier de configuration nswag
	file: string; //  url du Swagger.json
	input: string; // fichier de destination (généré)
	outputFile: string;
};

function generateFromNswag({ outputFile, file, input }: NSwagConf) {
	const command = `nswag run ${file} /variables:INPUT_URL=${input},OUTPUT_FILE=${outputFile}`;
	execSync(command);
}

if (require.main === module) {
	console.log("Generating http client for Backend Api");
	try {
		generateFromNswag({
			input: "http://localhost:4003/swagger/v1/swagger.json",
			file: path.resolve(__dirname, "nswag.json"),
			outputFile: path.resolve(__dirname, "..", "src", "core", "apis", "backend", "generated.ts"),
		});
	} catch (e) {
		console.error(e);
	}
}
