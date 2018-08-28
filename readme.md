## Flip
### Transform React to Vue!

Flip will consume your react component directory, and spit out a new directory full of Vue components.

Optionally, you can also bundle them into one nice exported bundle per framework (i.e - `bundle.react.js`, `bundle.vue.js`)


### How to use

```
yarn add -D @ssense/flip
```

To use, run

```
yarn flip [path-to-your-components]
```

This command also accepts an optional `-b` flag, which will rollup bundles of each your react and vue components for distribution.
