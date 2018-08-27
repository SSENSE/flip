import * as fs from "fs";
import { transformFileSync } from "@babel/core";

/*
*
* Use the babel api to run a custom plugin that converts react to vue.
*
* Args:
*  - path: string
*
* */
export const reactToVue = async path => {
  path += "/index.js";
  const splitPath = path.split("/");
  const dirName = splitPath[splitPath.length - 2];

  //use custom babel plugin (defined in .babelrc) to transform file
  const { code } = transformFileSync(path);

  const vuePath = `dist/vue/${dirName}/index.js`;

  if (!(await fs.existsSync(`dist/vue/${dirName}`))) {
    await fs.mkdirSync(`dist/vue/${dirName}`);

    await fs.writeFileSync(vuePath, code);
  } else {
    await fs.writeFileSync(vuePath, code);
  }
};

export const copyComponent = async path => {
  path += "/index.js";
  const splitPath = path.split("/");
  const dirName = splitPath[splitPath.length - 2];

  const reactPath = `dist/react/${dirName}/index.js`;

  if (!(await fs.existsSync(`dist/react/${dirName}`))) {
    await fs.mkdirSync(`dist/react/${dirName}`);

    await fs.copyFileSync(path, reactPath);
  } else {
    await fs.copyFileSync(path, reactPath);
  }
};
