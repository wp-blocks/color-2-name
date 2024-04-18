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
		plugins: [typescript(), nodeResolve(), ...plugins],
		output: {
			...output,
		},
		external: [],
	};
}

export default [
	config({
		plugins: [terser(terserOptions)],
		output: {
			format: "cjs",
			file: "lib/cjs/index.js",
		},
	}),
	config({
		output: {
			format: "iife",
			name: "color2name",
			file: "lib/browser/color-2-name.js",
		},
	}),
	config({
		plugins: [terser(terserOptions)],
		output: {
			format: "iife",
			name: "color2name",
			file: "lib/browser/color-2-name.min.js",
		},
	}),
	config({
		plugins: [terser(terserOptions)],
		input: "src/index.ts",
		output: {
			format: "esm",
			dir: "lib/esm/",
			preserveModules: true,
			preserveModulesRoot: "src",
		},
	}),
];
