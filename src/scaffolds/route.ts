const path = require("path");

const SimpleScaffold = require("simple-scaffold").default;
const routeName = "user";
export const scaffoldIndexServer = (props: any) =>
	new SimpleScaffold({
		name: routeName,
		templates: ["/", "templates/{{name}}.route.ts"],
		output: (filename, basePath) =>
			path.join(process.cwd(), "src/route/", filename.split("/").pop()),
		createSubFolder: false,
		locals: {
			property: "value",
			...props,
		},
	});
