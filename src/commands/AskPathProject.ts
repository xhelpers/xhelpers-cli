import { QuestionCommand } from "./base/QuestionCommand";

export class AskPathProject extends QuestionCommand {
  name: string;

  constructor() {
    super("pathProject");
  }

  getCommand = () => {
    const questions = [
      {
        name: this.name,
        type: "input",
        message: "Inform project path:",
        validate: function (value) {
          if (!!value) {
            return true;
          } else {
            return `Please enter valid path: ${value}`;
          }
        },
      },
    ];
    return this.inquirer.prompt(questions);
  };
}
