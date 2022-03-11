import { CloneProject } from "./cloneProject";
import { DatabaseInformation } from "./databaseInformation";
import { FrontTemplate } from "./frontTemplate";
import { PathProject } from "./pathProject";
import { ProjectType } from "./projectType";

export default {
	AskProjectType: new ProjectType().getCommand,
	AskDatabaseInformation: new DatabaseInformation().getCommand,
	AskCloneProject: new CloneProject().getCommand,
	AskPathProject: new PathProject().getCommand,
	AskFrontTemplate: new FrontTemplate().getCommand,
};
