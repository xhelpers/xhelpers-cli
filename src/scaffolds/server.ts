const pathMod = require("path");

const SimpleScaffold = require("simple-scaffold").default;

export const scaffoldIndexServer = new SimpleScaffold({
	name: "index.ts",
	templates: ["/", "templates/index.ts"],
	// output: path.join("src", "components"),
	output: (filename, basePath) =>
		pathMod.join(process.cwd(), "src", filename.split("/").pop()),
	// output: (filename, basePath) => [basePath, filename].join(path.sep),
	createSubFolder: false,
	locals: {
		property: "value",
	},
});
