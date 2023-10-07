import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import lessToJS from "less-vars-to-js";
import eslint from "vite-plugin-eslint";
import path from "path";
import config from "./config";

const themeVariables = lessToJS(
	fs.readFileSync(path.resolve(__dirname, "./config/variables.less"), "utf8"),
);

const env = process.argv[process.argv.length - 1];
const base = config[env];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	const port = env.VITE_APP_PORT || 5173;

	return {
		plugins: [react(), eslint()],
		resolve: {
			alias: [
				{
					find: /^@\//,
					replacement: `${path.resolve(process.cwd(), "src")}/`,
				},
				{
					find: /^~/,
					replacement: `${path.resolve(process.cwd(), "node_modules")}/`,
				},
			],
		},
		build: {
			chunkSizeWarningLimit: 1600,
		},
		css: {
			preprocessorOptions: {
				less: {
					javaScriptEnabled: true,
					modifyVars: themeVariables,
				},
			},
		},
		optimizeDeps: {
			include: ["@emotion/styled", "@mui/material"],
		},
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: "./setupTests.js",
		},
		server: {
			watch: {
				usePolling: true,
			},
			host: true, // needed for the Docker Container port mapping to work
			strictPort: true,
			port: port, // you can replace this port with any port
		},
	};
});
