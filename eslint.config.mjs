import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.tsx"],
    // Tout texte visible passe par messages/*.json (FR et EN).
    rules: { "react/jsx-no-literals": "error" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".claude/**", ".impeccable/**"]),
]);

export default eslintConfig;
