import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser },
  plugins: {
    prettier: prettierPlugin
  },
  rules: {
    // Indentation rule: 2 spaces (or switch to 'tab' if you prefer tabs)
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    // Prettier integration
    'prettier/prettier': ['error', { 
      tabWidth: 2,           // 2 spaces
      useTabs: false,        // Change to true if using tabs
      singleQuote: true,     // Single quotes
      semi: true             // Semicolons
    }]
  },
  extends: [
    prettierConfig   // Disable ESLint rules that conflict with Prettier
  ]},
  
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];