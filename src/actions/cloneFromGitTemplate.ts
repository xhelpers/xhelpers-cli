import { logger } from "../logs";

const download = require("download-git-repo");

function downloadGit(target, url) {
	return new Promise((resolve, reject) => {
		download(`direct:${url}`, target, { clone: true }, (err) => {
			if (err) {
				logger.error("Failed to download", err);
				reject(err);
			} else {
				logger.succes("Repository cloned", target);
				resolve(target);
			}
		});
	});
}

export function cloneFromGitTemplate(target, template) {
	try {
		logger.info("Copying files...", template.name, template.git);
		logger.info(template.name, template.git);
		downloadGit(target, template.git);
		logger.succes("The files have been copied!");
	} catch (error) {
		logger.error(`The requested template for ${template} wasn't found.`);
		process.exit(1);
	}
}
