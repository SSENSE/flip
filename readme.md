## Flip
### Transform React to Vue! 🔄

Flip will consume your React components directory, and spit out a new directory full of Vue components.

Optionally, you can also roll them into one nice exported bundle per framework (i.e - `bundle.react.js`, `bundle.vue.js`) 📦

Flip initially started as a fork of [this babel plugin](https://github.com/vueact/babel-plugin-transform-react-to-vue) and still uses a modified version of it under the hood.


### How to use

```
yarn add -D @ssense/flip
```

To use, run

```
yarn flip [path-to-your-components]
```

This command also accepts an optional `-b` flag, which will rollup bundles of each your react and vue components for distribution. This is how that will look:

```
yarn flip [path-to-your-components] -b
```

### Contribution

@todo

### License
Flip is ISC licensed.
