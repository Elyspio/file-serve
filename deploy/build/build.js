const { spawnSync } = require("child_process");
const path = require("path");

const dockerCommand = `docker buildx build --platform linux/amd64,linux/arm64  -f ${__dirname}/prod.dockerfile  -t elyspio/file-serve:latest --push .`.split(" ").filter((str) => str.length);

const ret = spawnSync(dockerCommand[0], dockerCommand.slice(1), {
	cwd: path.resolve(__dirname, "../../"),
	stdio: "inherit",
});

if (ret.status === 0) {
	spawnSync("ssh", ["elyspio@192.168.0.59", "cd /apps/own/file-serve && docker-compose pull && docker-compose up -d --remove-orphans"], {
		cwd: __dirname,
		stdio: "inherit",
	});
}
