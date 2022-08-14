import { cloneFromGitTemplate } from "../actions/cloneFromGitTemplate";
import files from "../files";
import inqQuestions from "../questions";
import { templateCloneConfig } from "../files/templates";

export default (program) => {
	program
		.command("clone [path] [templateName]")
		.alias("c")
		.description(
			`Start a new project by cloning a git repository
			 path: dir name to be created
			 templateName: template name[todo-sample, account-sample, mailman-sample]
			 xcli c demo1 todo-sample
			 `
		)
		.action(async (path, templateName) => {
			if (!path) {
				const { pathProject } = await inqQuestions.AskPathProject();
				path = pathProject;
			}
			files.mustBeNewDirectory(path);
			if (!templateName) {
				const { cloneType } = await inqQuestions.AskCloneProject();
				templateName = cloneType;
			}
			const template = templateCloneConfig[templateName];
			cloneFromGitTemplate(path, template);
		});

	program
		.command("clonelist")
		.alias("cl")
		.description(`Display clone templates`)
		.action(async () => {
			console.table(templateCloneConfig);
		});
};
