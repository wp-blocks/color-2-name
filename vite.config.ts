/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
	test: {
		coverage: {
			reporter: ["text", "json", "html"],
			exclude: ["**/node_modules/**", "**/lib/**"],
			include: ["src/**"],
			extension: ["ts", "tsx"],
		},
	},
});
