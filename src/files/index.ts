const fs = require("fs");
const pathMod = require("path");

export default {
	getCurrentDirectoryBase: () => {
		return pathMod.basename(process.cwd());
	},
	directoryExists: (path) => {
		return fs.existsSync(path);
	},
	getFilesOfDirectory: (path) => {
		return fs
			.readdirSync(path, { withFileTypes: true })
			.filter((item) => !item.isDirectory())
			.map((item) => item.name);
	},
	readFile: (path) => {
		return fs.readFileSync(path, { encoding: "utf8" });
	},
};
