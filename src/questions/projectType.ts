import { QuestionCommand } from "./base/QuestionCommand";

export class ProjectType extends QuestionCommand {
	name: string;

	constructor() {
		super("projectType");
	}

	ProjectTypes = ["websocket", "microservice"];

	getCommand = () => {
		const questions = [
			{
				name: this.name,
				type: "list",
				message: `Select xhelpers-api project type: (${this.name})`,
				choices: this.ProjectTypes,
				validate: function (value) {
					if (this.ProjectTypes.includes(value)) {
						return true;
					} else {
						return `Please enter valid project type: ${this.ProjectTypes.join(
							","
						)}`;
					}
				},
			},
		];
		return this.inquirer.prompt(questions);
	};
}
