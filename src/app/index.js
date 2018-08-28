#!/usr/bin/env node

import "@babel/polyfill";
import { generateComponents } from "./scripts";
import { build } from "./scripts/rollup";
const program = require("commander");

program
  .version("0.1.0")
  .command("transpile <dir>", "Transpile components in this directory")
  .option("-b", "--bundle", "Bundle components")
  .action(async (dir, { B }) => {
    await generateComponents(dir);

    if (B) {
      await build();
    }
  })
  .parse(process.argv);
