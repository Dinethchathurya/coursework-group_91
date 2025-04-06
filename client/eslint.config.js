import pluginReact from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser"; // Import the Babel parser

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        node: true,
      },
      parser: babelParser, 
      parserOptions: {
        requireConfigFile: false, 
        babelOptions: {
          presets: ["@babel/preset-react"], 
        },
      },
    },
  },
  {
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off",

    },
  },
];
