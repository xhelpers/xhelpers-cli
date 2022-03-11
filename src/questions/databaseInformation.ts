import { QuestionCommand } from "./base/QuestionCommand";

export class DatabaseInformation extends QuestionCommand {
	name: string;

	constructor() {
		super("databaseType");
	}

	dbTypes = ["MongoDB", "MySql", "PostgreSql", "Sql Server", "none"];

	getCommand = () => {
		const questions = [
			{
				name: this.name,
				type: "list",
				message: `Select database type: (${this.name})`,
				choices: this.dbTypes,
				validate: function (value) {
					if (this.dbTypes.includes(value)) {
						return true;
					} else {
						return `Please enter valid database: ${this.dbTypes.join(",")}`;
					}
				},
			},
		];
		return this.inquirer.prompt(questions);
	};
}
