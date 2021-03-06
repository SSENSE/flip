#!/usr/bin/env node

import "@babel/polyfill";
import { generateComponents } from "./scripts";
import { build } from "./scripts/rollup";
import * as fs from "fs";
const program = require("commander");

const { version } = JSON.parse(fs.readFileSync("package.json", "utf8"));

program
  .version(version)
  .command("<dir>", "Transpile components in this directory")
  .option("-s", "--style", "Location of styles directory")
  .option("-b", "--bundle", "Bundle components")
  .action(async (dir, { B, S }) => {
    await generateComponents(dir, S);

    if (B) {
      await build().catch(e => console.log(e));
    }
  })
  .parse(process.argv);
