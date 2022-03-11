import { QuestionCommand } from "./base/QuestionCommand";
const templateConfig = require("../templates-clone.json");

export class CloneProject extends QuestionCommand {
	name: string;

	constructor() {
		super("cloneType");
	}

	cloneTypes = Object.values(templateConfig).map((item: any) => {
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
