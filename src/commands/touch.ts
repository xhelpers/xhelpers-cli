import { touchFrontTemplate } from "../actions/touchFrontTemplate";
import { logger } from "../logs";
import inqQuestions from "../questions";
import files from "../files";

const templateFrontConfig = require("../templates-front.json");

export default (program) => {
	program
		.command("touch")
		.alias("t")
		.option("-p, --path <path>", "destiny path folder to touch files")
		.option("-c, --context <context>", "snippet context to use")
		.description("Create a new path with set of touched files")
		.action(async ({ path, context }) => {
			if (!path) {
				const { pathProject } = await inqQuestions.AskPathProject();
				path = pathProject;
			}

			if (files.directoryExists(path)) {
				logger.error(`Folder ${path} already exists!`);
				process.exit(1);
			}

			if (!context) {
				const { frontTemplate } = await inqQuestions.AskFrontTemplate();
				context = frontTemplate;
			}
			const template = templateFrontConfig[context];
			touchFrontTemplate(path, template);
		});
};
