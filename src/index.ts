#!/usr/bin/env node

import { Command } from "commander";
import { logger } from "./logs";
const program = new Command();
const chalk = require("chalk");
const figlet = require("figlet");

import inqQuestions from "./commands";
import { cloneFromGitTemplate } from "./actions/cloneFromGitTemplate";
import { inspectCurrentPath as inspectXhelpersProject } from "./actions/inspectCurrentPath";
import files from "./files";
import { touchFrontTemplate } from "./actions/touchFrontTemplate";
const templateConfig = require("./templates.json");
const templateFrontConfig = require("./templates-front.json");

// Trickery to cope with different relative paths for typescipt and javascript
// eslint-disable-next-line @typescript-eslint/no-var-requires
const myPackage = require("dummy_for_node_modules/../../package.json");

// # clear everything on every command (kind getting on the way of things)
// const clear = require("clear");
// clear();

logger.log(
  chalk.green(
    figlet.textSync("xcli commander", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  )
);
logger.log(
  "\n",
  chalk.yellow(
    "A simple CLI tool to create and manage xhelpers-api projects ;)"
  ),
  "\n"
);

program
  .version(myPackage.version)
  .alias("v")
  .description("xcli commander")
  .allowExcessArguments(false)
  .showSuggestionAfterError()
  .enablePositionalOptions()
  .configureHelp({
    sortSubcommands: true,
    sortOptions: true,
  })
  .option("--debug", "include debugging information, such as stack dump");

program
  .command("inspect")
  .alias("i")
  .option("-p, --path <path>", "path to inspect")
  .description("Inspect path looking for (xhelpers-api) settings")
  .action(({ path }) => {
    inspectXhelpersProject(path);
  });

program
  .command("clone")
  .alias("c")
  .option("-p, --path <path>", "destiny path folder to clone")
  .option("-t, --template <templateName>", "template git repository")
  .description("Start a new project by cloning a git repository")
  .action(async ({ path, templateName }) => {
    if (!path) {
      const { pathProject } = await inqQuestions.AskPathProject();
      path = pathProject;
    }
    if (files.directoryExists(path)) {
      logger.error(`Folder ${path} already exists!`);
      process.exit(1);
    }

    if (!templateName) {
      const { cloneType } = await inqQuestions.AskCloneProject();
      templateName = cloneType;
    }
    const template = templateConfig[templateName];
    cloneFromGitTemplate(path, template);
  });

program
  .command("touch")
  .alias("t")
  .option("-p, --path <path>", "destiny path folder to touch files")
  .option("-t, --template <templateName>", "template")
  .description("Create a new path with set of touched files")
  .action(async ({ path, templateName }) => {
    if (!path) {
      const { pathProject } = await inqQuestions.AskPathProject();
      path = pathProject;
    }
    if (files.directoryExists(path)) {
      logger.error(`Folder ${path} already exists!`);
      process.exit(1);
    }

    if (!templateName) {
      const { frontTemplate } = await inqQuestions.AskFrontTemplate();
      templateName = frontTemplate;
    }
    const template = templateFrontConfig[templateName];
    touchFrontTemplate(path, template);
  });

program.parse(process.argv);

// program
//   .command("add")
//   .alias("a")
//   .description("add ")
//   .action(async () => {
//     const questions = [
//       inqQuestions.AskProjectType,
//       inqQuestions.AskDatabaseInformation,
//     ];
//     let answers = {};
//     for (const question of questions) {
//       answers = {
//         ...answers,
//         ...(await question()),
//       };
//     }
//   });

// program
//   .command("setup")
//   .alias("s")
//   .option("-s, --settings <name>", "custom settings file")
//   .description("Init process to clone and update template based api")
//   .action(() => {
//     // prompt([]).then((answers) => {});
//   });
