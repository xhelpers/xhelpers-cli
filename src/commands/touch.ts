import { touchFrontTemplate } from "../actions/touchFrontTemplate";
import inqQuestions from "../questions";
import files from "../files";

const templateFrontConfig = require("../templates-front.json");

export default (program) => {
	program
		.command("touch [path] [context]")
		.alias("t")
		.description(
			`Create a new path with set of touched files
			 path: dir name to be created
			 context: context name[component, container, service, saga, screen]
			 xcli t demo1 component
			 `
		)
		.action(async (path, context) => {
			if (!path) {
				const { pathProject } = await inqQuestions.AskPathProject();
				path = pathProject;
			}
			files.mustBeNewDirectory(path);

			if (!context) {
				const { frontTemplate } = await inqQuestions.AskFrontTemplate();
				context = frontTemplate;
			}
			const template = templateFrontConfig[context];
			touchFrontTemplate(path, template);
		});
};
