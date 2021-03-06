import * as fs from "fs";
import { transformFileSync } from "@babel/core";
import reactTranspiler from '../utils/react-to-vue';
import customVuePreset from '../utils/vue-preset'

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

  await result.forEach(async dirName => {
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
        "@babel/preset-typescript",
        [
          customVuePreset,
          {
            eventModifiers: false,
            vModel: false
          }
        ]
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        reactTranspiler
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

/*
 *
 * Copies components into the dist directory.
 *
 * Args:
 *  - path: string
 *
 * */
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

/*
 *
 * Build paths to use during transpilation.
 *
 * Args:
 *  - path: string
 *
 * */
export const buildPath = async path => {
  let extension = "";
  if (fs.existsSync(`${path}/index.tsx`)) {
    path += "/index.tsx";
    extension = "tsx";
  } else if (fs.existsSync(`${path}/index.jsx`)) {
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
