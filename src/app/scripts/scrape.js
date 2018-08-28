import * as fs from "fs";
import { copyComponent, reactToVue } from "./transpile";

/*
*
* Generate an index.js file in each framework directory importing
* and exporting all of it's components.
*
* Args:
*  - framework: string
*
* */
export const generateExports = async framework => {
  const imports = [];
  const exports = [];
  const results = await fs.readdirSync(`dist/${framework}`);

  await results
      .filter(result => !result.includes("."))
      .forEach(dirName => {
        // we use ../ vs absolute import because rollup needs to see a relative path
        imports.push(`import ${dirName} from '../${framework}/${dirName}';`);
        exports.push(`exports.${dirName} = ${dirName};`);
      });

  await fs.writeFileSync(`dist/${framework}/index.js`, imports.join("\n"));
  await fs.appendFileSync(`dist/${framework}/index.js`, "\n" + exports.join("\n"));
};

/*
*
* Send each component to be translated and copied into dist
*
* Args:
*  - path: string
*
* */
export const translateComponents = async path => {
  const components = [];
  const result = await fs.readdirSync(path);

  result.forEach(async dirName => {
    const pathAndDir = path + `/${dirName}`;

    // copy react components to dist
    components.push(copyComponent(pathAndDir));

    // translate react components to vue components
    components.push(reactToVue(pathAndDir));
  });

  return Promise.all(components);
};

/*
*
*  Ensure our dist file structure is prepared for writing.
*  This is run on every translation attempt, and checks to make sure
*  each component director exists before writing it's index
*
* Args:
*  - framework: string
*
* */
export const dirCheck = async framework => {
  if (!(await fs.existsSync("dist"))) {
    await fs.mkdirSync("dist");

    if (!fs.existsSync("dist/styles")) {
      await fs.mkdirSync("dist/styles");
      await fs.copyFileSync("src/styles/atoms.js", "dist/styles/atoms.js");
    }
  }

  if (!(await fs.existsSync(`dist/${framework}`))) {
    await fs.mkdirSync(`dist/${framework}`);
  }
};
