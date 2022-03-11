const fs = require("fs");
const pathMod = require("path");
import { logger } from "../logs";

export default {
	getCurrentDirectoryBase: () => {
		return pathMod.basename(process.cwd());
	},
	directoryExists: (path) => {
		return fs.existsSync(path);
	},
	mustBeNewDirectory: (path) => {
		if (fs.existsSync(path)) {
			logger.error(`Folder ${path} already exists!`);
			process.exit(1);
		}
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
