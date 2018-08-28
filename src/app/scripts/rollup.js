import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

const rollup = require('rollup');

const buildReact = async () => {
    console.log('\nBundling React Components...');
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
                    "@babel/plugin-proposal-object-rest-spread",
                    "@babel/plugin-proposal-class-properties"
                ],
                exclude: "node_modules/**"
            })
        ]
    };

    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    // console.log(bundle.imports); // an array of external dependencies
    // console.log(bundle.exports); // an array of names exported by the entry point
    // console.log(bundle.modules); // an array of module objects

    const outputOptions = {
        file: "dist/bundles/bundle.react.js",
        format: "cjs"
    };
    // or write the bundle to disk
    await bundle.write(outputOptions);

    console.log('Done!');
};

const buildVue = async () => {

    console.log('\nBundling Vue Components...')

    // see below for details on the options
    const inputOptions = {
        input: "dist/vue/index.js",
        // All the used libs needs to be here
        external: ["vue-styled-components"],
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
                    "vue"
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
    const bundle = await rollup.rollup(inputOptions);

    // console.log(bundle.imports); // an array of external dependencies
    // console.log(bundle.exports); // an array of names exported by the entry point
    // console.log(bundle.modules); // an array of module objects

    const outputOptions = {
        file: "dist/bundles/bundle.vue.js",
        format: "cjs"
    };

    // or write the bundle to disk
    await bundle.write(outputOptions);

    console.log('Done!');
};

export const build = async () => {
      await buildReact();
      await buildVue();
};
