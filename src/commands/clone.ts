import { logger } from "../logs";
import { cloneFromGitTemplate } from "../actions/cloneFromGitTemplate";
import files from "../files";
import inqQuestions from "../questions";

const templateConfig = require("../templates-clone.json");

export default (program) => {
	program
		.command("clone [path] [templateName]")
		.alias("c")
		.option("-p, --path <path>", "destiny path folder to clone")
		.option("-t, --template <templateName>", "template git repository")
		.description("Start a new project by cloning a git repository")
		.action(async (path, templateName) => {
			if (!path) {
				const { pathProject } = await inqQuestions.AskPathProject();
				path = pathProject;
			}
			if (files.directoryExists(path)) {
				logger.error(`Folder ${path} already exists!`);
				process.exit(1);
			}

			if (!templateName) {
				const { cloneType } = await inqQuestions.AskCloneProject();
				templateName = cloneType;
			}
			const template = templateConfig[templateName];
			cloneFromGitTemplate(path, template);
		});
};
