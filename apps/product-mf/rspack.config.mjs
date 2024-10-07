import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import RefreshPlugin from "@rspack/plugin-react-refresh";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sass from "sass-embedded";

// CommonJS require
const require = createRequire(import.meta.url);
const deps = require("./package.json").dependencies;

// CommonJS modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Env variables
const isDev = process.env.NODE_ENV === "development";

// Target browsers
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/main.tsx",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  devServer: {
    historyApiFallback: true, // Add this to handle SPA routing
    port: 3001,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  output: {
    uniqueName: "product_mf",
    publicPath: "auto",
  },
  watchOptions: {
    ignored: ["**/node_modules/**", "**/@mf-types/**", "**/shared/**"],
  },
  module: {
    parser: {
      "css/auto": {
        namedExports: false,
      },
    },

    rules: [
       {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css/auto",
      },
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              api: "modern-compiler",
              implementation: sass,
            },
          },
        ],
        type: "css/auto",
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),

    isDev ? new RefreshPlugin() : null,

    new ModuleFederationPlugin({
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
  ].filter(Boolean),

  optimization: {
    // Disabling minimization: Minimization will eventually be handled by the shell
    // Minimization is disabled so that styles are not minimized and can be shared between the shell and the remote
    minimize: false,

    // Standalone build for the remote can be enabled by setting the following
    // minimizer: [
    //   new rspack.SwcJsMinimizerRspackPlugin(),
    //   new rspack.LightningCssMinimizerRspackPlugin({
    //     minimizerOptions: { targets },
    //   }),
    // ],
  },
  experiments: {
    css: true,
  },
});
