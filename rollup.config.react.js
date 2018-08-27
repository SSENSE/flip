import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  input: "dist/react/index.js",
  output: {
    file: "dist/bundles/bundle.react.js",
    format: "cjs"
  },
  // All the used libs needs to be here
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
      plugins: ["@babel/plugin-proposal-object-rest-spread"],
      exclude: "node_modules/**"
    })
  ]
};
