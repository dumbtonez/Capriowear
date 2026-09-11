import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // .claude/worktrees holds full nested checkouts of this same repo (one
    // per parallel Claude Code session) -- without this, a repo-wide `eslint .`
    // also lints every file inside every one of those copies, multiple times
    // over (1.7GB+ on disk), which is what was actually causing the
    // `eslint .` JS heap OOM/stack overflow, not a real lint issue in this
    // repo's own source. `.claude/**` covers worktrees and anything else
    // ever added under it (settings, launch.json) -- none of that is
    // this project's own lintable code.
    ".claude/**",
  ]),
]);

export default eslintConfig;
