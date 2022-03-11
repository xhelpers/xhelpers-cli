import files from "../files";
import { logger } from "../logs";

const chalk = require("chalk");

export function inspectCurrentPath(path) {
	logger.log(
		chalk.yellow(
			`Running 'inspect' on base: '${files.getCurrentDirectoryBase()}' path: ${path}\n`
		)
	);
	const basePath = path || ".";
	let status = {
		routes: 0,
		routesfiles: [],
		services: 0,
		servicesfiles: [],
		model: 0,
		modelfiles: [],
		manifest: 0,
		manifestFiles: [],
		gitactions: 0,
		gitactionsFiles: [],
	};

	const paths = {
		routePath: `${basePath}/src/routes`,
		servicePath: `${basePath}/src/services`,
		modelPath: `${basePath}/src/model`,
		manifestPath: `${basePath}/manifests`,
		gitActionPath: `${basePath}/.github/workflows`,
	};

	if (
		files.directoryExists(paths.routePath) &&
		files.directoryExists(paths.servicePath)
	) {
		console.log(chalk.blue("✅  Current folder has xhelpers-api components"));

		status = {
			...status,
			routes: 1,
			routesfiles: files.getFilesOfDirectory(paths.routePath),
			services: 1,
			servicesfiles: files.getFilesOfDirectory(paths.servicePath),
		};

		if (files.directoryExists(paths.modelPath)) {
			status = {
				...status,
				model: 1,
				modelfiles: files.getFilesOfDirectory(paths.modelPath),
			};
		}

		if (files.directoryExists(paths.manifestPath)) {
			status = {
				...status,
				manifest: 1,
				manifestFiles: files.getFilesOfDirectory(paths.manifestPath),
			};
		}

		if (files.directoryExists(paths.gitActionPath)) {
			status = {
				...status,
				gitactions: 1,
				gitactionsFiles: files.getFilesOfDirectory(paths.gitActionPath),
			};
		}
	} else {
		logger.error("Current folder is not an xhelpers-api project");
	}

	if (files.directoryExists(paths.routePath)) {
		const serverFile = files.readFile(`${basePath}/src/index.ts`);
		const pkgJson = files.readFile(`${basePath}/package.json`);
		const pjson = JSON.parse(pkgJson);

		const serverSettings = [
			{
				name: "Sequelize",
				type: "Database",
				enabled: !!(serverFile.match(/sequelizeOptions/g) || []).length,
			},
			{
				name: "Mongoose",
				type: "Database",
				enabled: !!(serverFile.match(/mongooseOptions/g) || []).length,
			},
			{
				name: "JWT",
				type: "Auth",
				enabled: !!(serverFile.match(/jwt_secret:/g) || []).length,
			},
			{
				name: "APP_KEY",
				type: "Auth",
				enabled: !!(serverFile.match(/app_key_auth:/g) || []).length,
			},
			{
				name: "SSO",
				type: "Auth",
				enabled: !!(serverFile.match(/ssoCallback:/g) || []).length,
			},
			{
				name: "Sentry",
				type: "Logs",
				enabled: !!(serverFile.match(/sentryOptions:/g) || []).length,
			},
		];

		logger.log(
			chalk.blue(`\t ${pjson.description} - version: ${pjson.version}`)
		);
		logger.log(
			chalk.blue(`🌲  xhelpers-api: ${pjson.dependencies["xhelpers-api"]}`)
		);
		logger.log(
			chalk.blue(`🌲  typescript: ${pjson.dependencies["typescript"]}`)
		);

		logger.succes(chalk.blue("Server xhelpers-api settings"));
		console.table(serverSettings);
	}

	let objectsXhelpers = [];
	if (status.routes)
		objectsXhelpers = [
			...objectsXhelpers,
			...status.routesfiles.map((m) => {
				return {
					name: m,
					type: "Route",
					count: (
						files.readFile(`${paths.routePath}/${m}`).match(/this.route/g) || []
					).length,
				};
			}),
		];
	if (status.services)
		objectsXhelpers = [
			...objectsXhelpers,
			...status.servicesfiles.map((m) => {
				return {
					name: m,
					type: "Service",
					count: 0,
				};
			}),
		];
	if (status.model)
		objectsXhelpers = [
			...objectsXhelpers,
			...status.modelfiles.map((m) => {
				return {
					name: m,
					type: "Model",
					count: 0,
				};
			}),
		];
	if (status.manifest)
		objectsXhelpers = [
			...objectsXhelpers,
			...status.manifestFiles.map((m) => {
				return {
					name: m,
					type: "Manifest",
					count: 0,
				};
			}),
		];
	if (status.gitactions)
		objectsXhelpers = [
			...objectsXhelpers,
			...status.gitactionsFiles.map((m) => {
				return {
					name: m,
					type: "GitAction",
					count: 0,
				};
			}),
		];

	if (objectsXhelpers.length > 0) {
		logger.succes(chalk.blue("Components xhelpers-api"));
		console.table(objectsXhelpers);
	}

	if (files.directoryExists(`${basePath}/.git`)) {
		logger.error(chalk.red("Current folder is already a Git repository!"));
	} else {
		logger.succes(chalk.green("Current folder is not Git repository"));
	}
}
