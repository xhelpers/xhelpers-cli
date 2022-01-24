import { logger } from "../logs";
import axios from "axios";

const download = require("download-git-repo");
const { mkdir } = require("fs/promises");
const fs = require("fs");

async function touch(path, content) {
  fs.writeFileSync(path, content);
}

async function replaceVars(data, target, template) {
  return data
    .replace(/{name}/g, target)
    .replace(/{context}/g, template.name)
    .replace(/{Component}/g, `${target}${template.name}`);
}

const mkdirAsync = (path) =>
  new Promise<void>((resolve, reject) =>
    fs.mkdirSync(path, (err) =>
      err && err.code !== "EEXIST" ? reject(err) : resolve()
    )
  );

async function touchTemplateFiles(target, template) {
  const { files } = template || [];
  if (files.length < 0) {
    logger.error(`The requested template ${template} has no files.`);
    return;
  }
  await mkdir(target);

  for (const file of files) {
    const resp = await axios.get(file.gist);
    const { data } = resp;
    const strToSave = await replaceVars(data, target, template);
    const fileName = await replaceVars(file.name, target, template);
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
