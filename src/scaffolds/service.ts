const pathMod = require("path");

const SimpleScaffold = require("simple-scaffold").default;
const routeName = "user";
export const scaffoldIndexServer = new SimpleScaffold({
	name: routeName,
	templates: ["/", "templates/{{name}}.service.ts"],
	output: (filename, basePath) =>
		pathMod.join(process.cwd(), "src/services/", filename.split("/").pop()),
	createSubFolder: false,
	locals: {
		property: "value",
	},
});
