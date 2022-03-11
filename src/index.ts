#!/usr/bin/env node

import { Command } from "commander";
import CommandsSetup from "./commands";
import { logger } from "./logs";
const program = new Command();
const chalk = require("chalk");
const figlet = require("figlet");

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
	.allowExcessArguments(false)
	.showSuggestionAfterError()
	.enablePositionalOptions()
	.configureHelp({
		sortSubcommands: true,
		sortOptions: true,
	})
	.option("--debug", "include debugging information, such as stack dump")
	.command("version")
	.alias("v")
	.alias("-v")
	.description("display installed cli version")
	.action(async () => {
		console.log(`\nxhelpers-cli: ${myPackage.version}\n`);
	});

CommandsSetup.commands.forEach((setup) => setup(program));

program.parse(process.argv);
