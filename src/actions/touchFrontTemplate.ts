import { logger } from "../logs";
import axios from "axios";

const { mkdir } = require("fs/promises");
const fs = require("fs");

async function touch(path, content) {
	fs.writeFileSync(path, content);
}

async function replaceVars(data, target, template) {
	return data
		.replace(/{name}/g, target)
		.replace(/{context}/g, template.value)
		.replace(/{Component}/g, `${target}${template.name}`);
}

async function touchTemplateFiles(target, template) {
	const { files } = template || [];
	if (files.length < 0) {
		logger.error(`The requested template ${template} has no files.`);
		return;
	}
	await mkdir(target, { recursive: true });
	const pathParts = target.split("/");
	let nameFile = target;
	if (pathParts?.length > 1) {
		nameFile = pathParts.pop();
	}
	for (const file of files) {
		logger.info(`Template url: ${file.file}`);
		const resp = await axios.get(file.file);
		const { data } = resp;
		const strToSave = await replaceVars(data, nameFile, template);
		const fileName = await replaceVars(file.name, nameFile, template);
		const filePath = `${target}/${fileName}`;
		logger.info(`New File: ${filePath}`);
		await touch(filePath, strToSave);
	}
}

export function touchFrontTemplate(target, template) {
	try {
		logger.info("Touching files...", template.name);
		touchTemplateFiles(target, template);
		logger.succes("The files have been copied!");
	} catch (error) {
		logger.error(`The requested template for ${template} wasn't found.`);
		process.exit(1);
	}
}
