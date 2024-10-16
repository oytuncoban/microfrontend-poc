import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import { resolve } from "node:path";
import { dependencies as deps } from "./package.json";

// Target browsers
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

// Remote entry URLs
export const REMOTES = {
	productMF: getRemoteEntryUrl("product_mf", "PRODUCT_URL", "localhost", 3001),
};

// Env variables
const isDev = process.env.NODE_ENV === "development";
const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

export default defineConfig({
	server: {
		port: PORT,
		publicDir: [
			{ name: "./public", copyOnBuild: true },
			{ name: "./src/assets", copyOnBuild: true },
		],
		historyApiFallback: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers":
				"X-Requested-With, content-type, Authorization",
		},
	},
	html: {
		template: "./index.html",
	},
	source: {
		entry: {
			index: "./src/main.tsx",
		},
	},
	plugins: [
		pluginReact(),
		pluginSass({
			sassLoaderOptions: {
				additionalData: `@import "${resolve(
					__dirname,
					"src/styles/_mantine.scss",
				)}";`,
			},
		}),
		pluginModuleFederation({
			name: "shell",
			remotes: REMOTES,
			shared: {
				...deps,
				react: { eager: true, singleton: true, requiredVersion: deps.react },
				"react-dom": {
					eager: true,
					singleton: true,
					requiredVersion: deps["react-dom"],
				},
				"react-router-dom": {
					eager: true,
					singleton: true,
					requiredVersion: deps["react-router-dom"],
				},
			},
			runtimePlugins: [
				resolve(__dirname, "../../shared-strategy.ts"),
				resolve(__dirname, "../../offline-remote.ts"),
			],
		}),
	],

	tools: {
		lightningcssLoader: {
			targets,
		},
		rspack: {
			watchOptions: {
				ignored: [
					"**/node_modules/**",
					"**/@mf-types/**",
					"**/dist/**",
					"**/shared/**",
				],
			},
			output: {
				uniqueName: "shell",
			},
			module: {
				parser: {
					"css/auto": {
						namedExports: false,
					},
				},
			},
		},
	},
});

function getRemoteEntryUrl(
	remoteName: string,
	envKey: string,
	fallback = "localhost",
	fallbackPort = 3001,
) {
	const urlPrefix = process.env[envKey] ?? `http://${fallback}:${fallbackPort}`;

	return `${remoteName}@${urlPrefix}/mf-manifest.json`;
}
