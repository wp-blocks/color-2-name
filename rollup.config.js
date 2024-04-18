import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const terserOptions = {
	mangle: true,
	compress: {
		passes: 2,
	},
	output: {
		beautify: false,
		comments: false,
		inline_script: true,
	},
};

function config({ plugins = [], output = {} }) {
	return {
		input: "src/index.ts",
		plugins: [typescript(), nodeResolve(), terser(terserOptions), ...plugins],
		output: {
			...output,
		},
		external: [],
	};
}

export default [
	config({
		output: {
			format: "cjs",
			file: "lib/cjs/index.js",
		},
	}),
	config({
		output: {
			format: "iife",
			name: "color2name",
			file: "lib/iife/index.js",
		},
	}),
	config({
		input: "src/index.ts",
		output: {
			format: "esm",
			dir: "lib/esm/",
			preserveModules: true,
			preserveModulesRoot: "src",
		},
	}),
];
