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
  try {
    const { extension, dirName, newPath } = await buildPath(path);

    // use custom babel plugin to transform file
    // source: src/utils/vue-to-react
    const { code } = transformFileSync(newPath, {
      babelrc: false,
      presets: [
        [
          "module:vue-preset",
          {
            eventModifiers: false,
            vModel: false
          }
        ]
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "module:react-to-vue"
      ]
    });

    const vuePath = `dist/vue/${dirName}/index.${extension}`;

    if (!(await fs.existsSync(`dist/vue/${dirName}`))) {
      await fs.mkdirSync(`dist/vue/${dirName}`);
    }

    await fs.writeFileSync(vuePath, code);
  } catch (e) {
    throw new Error(e);
  }
};

export const copyComponent = async path => {
  try {
    const { extension, newPath, dirName } = await buildPath(path);

    const reactPath = `dist/react/${dirName}/index.${extension}`;

    if (!(await fs.existsSync(`dist/react/${dirName}`))) {
      await fs.mkdirSync(`dist/react/${dirName}`);
    }

    await fs.copyFileSync(newPath, reactPath);
  } catch (e) {
    throw new Error(e);
  }
};

const buildPath = async path => {
  let extension = "";
  if (fs.existsSync(`${path}/index.jsx`)) {
    path += "/index.jsx";
    extension = "jsx";
  } else {
    path += "/index.js";
    extension = "js";
  }

  const splitPath = path.split("/");
  const dirName = splitPath[splitPath.length - 2];

  return {
    extension,
    newPath: path,
    dirName
  };
};
