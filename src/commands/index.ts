import { AskCloneProject } from "./AskCloneProject";
import { AskDatabaseInformation } from "./AskDatabaseInformation";
import { AskFrontTemplate } from "./AskFrontTemplate";
import { AskPathProject } from "./AskPathProject";
import { AskProjectType } from "./AskProjectType";

export default {
  AskProjectType: new AskProjectType().getCommand,
  AskDatabaseInformation: new AskDatabaseInformation().getCommand,
  AskCloneProject: new AskCloneProject().getCommand,
  AskPathProject: new AskPathProject().getCommand,
  AskFrontTemplate: new AskFrontTemplate().getCommand,
};
