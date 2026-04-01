// @ts-nocheck
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ["./packages/*/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  },
  tseslint.configs.recommended,
]);