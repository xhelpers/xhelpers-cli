import { QuestionCommand } from "./base/QuestionCommand";
import { templateCloneConfig } from "../files/templates";

export class CloneProject extends QuestionCommand {
	name: string;

	constructor() {
		super("cloneType");
	}

	cloneTypes = Object.values(templateCloneConfig).map((item: any) => {
		return {
			name: item.name,
			value: item.value,
		};
	});

	getCommand = () => {
		const questions = [
			{
				name: this.name,
				type: "list",
				message: "Select template to clone:",
				choices: this.cloneTypes,
				validate: function (value) {
					if (this.cloneTypes.includes(value)) {
						return true;
					} else {
						return `Please enter valid clone type: ${this.cloneTypes.join(
							","
						)}`;
					}
				},
			},
		];
		return this.inquirer.prompt(questions);
	};
}
