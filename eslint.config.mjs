// @ts-check
import eslint from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
   {
      ignores: ["eslint.config.mjs"],
   },
   eslint.configs.recommended,
   {
      languageOptions: {
         globals: {
            ...globals.node,
            ...globals.jest,
         },
         sourceType: "commonjs",
         parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
         },
      },
   },
   {
      rules: {
         "@typescript-eslint/no-explicit-any": "off",
         "@typescript-eslint/no-floating-promises": "warn",
         "@typescript-eslint/no-unsafe-argument": "warn",
         "no-unused-vars": [
            "warn",
            {
               argsIgnorePattern: "^_",
               varsIgnorePattern: "^_",
            },
         ],
         "no-unused-imports": "warn",
      },
   },
)
