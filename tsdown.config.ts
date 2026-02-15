import { defineConfig } from "tsdown";

export default defineConfig({
	name: "tsup",
	target: "node18",
	format: ["esm", "cjs"],
	entry: ["src/index.ts"],
	skipNodeModulesBundle: true,
	dts: true,
	unbundle: true,
	treeshake: true,
	minify: true,
	shims: true,
	clean: true,
	outDir: "lib",
	outExtensions({ format }) {
		return {
			js: format === "cjs" ? ".cjs" : ".js",
		};
	},
});
