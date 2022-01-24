import { QuestionCommand } from "./base/QuestionCommand";
const templateConfig = require("../templates-front.json");

export class AskFrontTemplate extends QuestionCommand {
  name: string;

  constructor() {
    super("frontTemplate");
  }

  TemplateTypes = Object.values(templateConfig).map((item: any) => {
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
        message: `Select xhelpers-front type: (${this.name})`,
        choices: this.TemplateTypes,
        validate: function (value) {
          if (this.ProjectTypes.includes(value)) {
            return true;
          } else {
            return `Please enter valid type: ${this.ProjectTypes.join(",")}`;
          }
        },
      },
    ];
    return this.inquirer.prompt(questions);
  };
}
