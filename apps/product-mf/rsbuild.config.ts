import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import { resolve } from "node:path";
import { dependencies as deps } from "./package.json";

// Target browsers
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
	server: {
		port: 3001,
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
	// html: {
	// 	template: "./index.html",
	// },
	source: {
		entry: {
			index: "./src/main.tsx",
		},
	},
	plugins: [
		pluginReact(),
		pluginSass({}),
		pluginModuleFederation({
			name: "product_mf",
			remotes: {
				shell: "shell@http://localhost:3000/mf-manifest.json",
			},
			exposes: {
				"./ProductApp": "./src/RemoteEntry.tsx",
				"./CartButton": "./src/components/CartButton.tsx",
			},
			shared: {
				...deps,
				react: { singleton: true, requiredVersion: deps.react },
				"react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
				"react-router-dom": {
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
				uniqueName: "product_mf",
				publicPath: "auto",
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
