import * as fs from "fs";
import { translateComponents } from "./transpile";

/*
*
* Run our component generation suite
*
* Args:
*  - pathToComponents: string
*
* */ 
export const generateComponents = async (pathToComponents, log = true) => {
  try {
    if(log) {
      console.log("\nChecking dist directory structure...");
    }
    const frameworks = ["react", "vue"]
    await dirCheck(frameworks, 'styles');

    if(log) {
      console.log("\nTranspiling components...");
    }
    await translateComponents(pathToComponents);

    if(log) {
      console.log("\nBuilding exports...");
    }

    await generateExports("react");
    await generateExports("vue");
  } catch (e) {
    console.log(e);
  }
};

/*
*
* Generate an index.js file in each framework directory importing
* and exporting all of it's components.
*
* Args:
*  - framework: string
*
* */
const generateExports = async framework => {
  const imports = [];
  const exports = [];
  const results = await fs.readdirSync(`dist/${framework}`);

  await results
    .filter(result => !result.includes("."))
    .forEach(dirName => {
      // we use ../ vs absolute import because rollup needs to see a relative path
      imports.push(`import ${dirName} from './${dirName}/index.jsx';`);
      exports.push(`exports.${dirName} = ${dirName};`);
    });

  await fs.writeFileSync(`dist/${framework}/index.js`, imports.join("\n"));
  await fs.appendFileSync(
    `dist/${framework}/index.js`,
    "\n" + exports.join("\n")
  );
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
export const dirCheck = async (frameworks, stylesDir) => {
  if (!(await fs.existsSync("dist"))) {
    await fs.mkdirSync("dist");

    if (!fs.existsSync("dist/styles")) {
      await fs.mkdirSync("dist/styles");
      await fs.copyFileSync(`${stylesDir}/atoms.js`, "dist/styles/atoms.js");
    }
  }

  frameworks.forEach(async framework => {
    if (!(await fs.existsSync(`dist/${framework}`))) {
      await fs.mkdirSync(`dist/${framework}`);
    }
  })
};

