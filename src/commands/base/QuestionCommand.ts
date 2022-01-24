import { IQuestionCommand } from "./IQuestionCommand";

export abstract class QuestionCommand implements IQuestionCommand {
  name: string;
  protected inquirer = require("inquirer");
  constructor(name: string) {
    this.name = name;
  }

  abstract getCommand();
}
