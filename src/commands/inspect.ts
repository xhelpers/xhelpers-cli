import { inspectCurrentPath } from "../actions/inspectCurrentPath";

export default (program) => {
	program
		.command("inspect [path]")
		.alias("i")
		.option("-p, --path <path>", "path to inspect")
		.description("Inspect path looking for (xhelpers-api) settings")
		.action(({ path }) => {
			inspectCurrentPath(path);
		});
};
