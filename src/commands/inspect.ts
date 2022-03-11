import { inspectCurrentPath } from "../actions/inspectCurrentPath";

export default (program) => {
	program
		.command("inspect [path]")
		.alias("i")
		.description("Inspect path looking for (xhelpers-api) settings")
		.description(
			`Inspect path looking for (xhelpers-api) settings
			 path: xhelpers project path			 
			 xcli i demo1
			 `
		)
		.action((path) => {
			inspectCurrentPath(path);
		});
};
