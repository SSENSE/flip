import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

const rollup = require("rollup");

/*
*
* Bundle react components
*
* */
const buildReact = async () => {
  console.log("\nBundling React Components...");
  // see below for details on the options
  const inputOptions = {
    input: "dist/react/index.js",
    external: ["react", "prop-types", "styled-components"],
    plugins: [
      resolve(),
      babel({
        babelrc: false,
        sourceMaps: true,
        presets: [
          [
            "@babel/env",
            {
              modules: false,
              shippedProposals: true
            }
          ],
          "@babel/react"
        ],
        plugins: [
          // mergeJSXProps,
          "@babel/plugin-proposal-object-rest-spread",
          "@babel/plugin-proposal-class-properties"
        ],
        exclude: "node_modules/**"
      })
    ]
  };

  // create a bundle
  const bundle = await rollup.rollup(inputOptions).catch(e => console.log(e));

  const outputOptions = {
    file: "dist/bundles/bundle.react.js",
    format: "cjs"
  };
  // or write the bundle to disk
  await bundle.write(outputOptions);

  console.log("Done!");
};

/*
*
* Bundle vue components
*
* */
const buildVue = async () => {
  console.log("\nBundling Vue Components...");

  // see below for details on the options
  const inputOptions = {
    input: "dist/vue/index.js",
    // All the used libs needs to be here
    external: ["react", "vue-styled-components"],
    plugins: [
      resolve(),
      babel({
        babelrc: false,
        presets: [
          [
            "@babel/env",
            {
              modules: false
            }
          ],
          [
            "module:babel-preset-vue",
            {
              eventModifiers: false,
              vModel: false
            }
          ]
        ],
        plugins: [
          "@babel/plugin-proposal-object-rest-spread",
          "@babel/plugin-proposal-class-properties"
        ],
        exclude: "node_modules/**"
      })
    ]
  };

  // create a bundle
  const bundle = await rollup.rollup(inputOptions).catch(e => console.log(e));

  const outputOptions = {
    file: "dist/bundles/bundle.vue.js",
    format: "cjs"
  };

  // or write the bundle to disk
  await bundle.write(outputOptions).catch(e => console.log(e));

  console.log("Done!");
};

/*
*
* export bundling methods
*
* */
export const build = async () => {
  await buildReact();
  await buildVue();
};
