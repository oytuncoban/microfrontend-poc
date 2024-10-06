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
const PORT = process.env.PORT || 3000;

// Target browsers
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

// Remote entry URLs
export const REMOTES = {
  productMF: getRemoteEntryUrl("product_mf", "PRODUCT_URL", "localhost", 3001),
};

export default defineConfig({
  context: __dirname,
  port: PORT,
  entry: {
    main: "./src/main.tsx",
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  devServer: {
    historyApiFallback: {
      index: "/index.html",
    },
    port: PORT,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  output: {
    sourcemap: true,
    uniqueName: "shell",
    publicPath: "auto",
    // publicPath: isDev ? "/" : "http://localhost:80",
    // ...(isDev
    //   ? {
    //       filename: "[name].[contenthash].js",
    //       chunkFilename: "[name].[contenthash].js",
    //     }
    //   : {}),
  },
  watchOptions: {
    ignored: ["**/node_modules/**", "**/@mf-types/**"],
  },
  module: {
    parser: {
      "css/auto": {
        namedExports: false,
      },
    },
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              api: "modern-compiler",
              implementation: sass,
              additionalData: `@import "${resolve(
                __dirname,
                "src/styles/_mantine.scss"
              )}";`,
              sassOptions: {
                includePaths: [resolve(__dirname, "src")],
              },
            },
          },
        ],
        type: "css/auto",
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: { "postcss-preset-mantine": {} },
              },
            },
          },
        ],
        type: "css/auto",
      },
      {
        test: /\.svg$/,
        type: "asset",
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
  ].filter(Boolean),
  devtool: !isDev ? "source-map" : "eval-cheap-module-source-map",

  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],

    // minimize: !isDev,
    // minimizer: !isDev
    //   ? [
    //       new rspack.SwcJsMinimizerRspackPlugin({
    //         sourceMap: true,
    //       }),
    //       new rspack.LightningCssMinimizerRspackPlugin({
    //         sourceMap: true,
    //       }),
    //     ]
    //   : [],
  },
  experiments: {
    css: true,
  },
});

function getRemoteEntryUrl(
  remoteName,
  envKey,
  fallback = "localhost",
  fallbackPort = 3001
) {
  const urlPrefix = process.env[envKey] ?? `http://${fallback}:${fallbackPort}`;

  return `${remoteName}@${urlPrefix}/mf-manifest.json`;
}
