# Flip
## 🔄 Transform React to Vue! 🔄

<a href="https://github.com/Groupe-Atallah/flip/issues#boards?repos=146508330"><img src="https://img.shields.io/badge/Shipping_faster_with-ZenHub-5e60ba.svg?style=flat-square"></a>

Flip is great for teams migrating from react to vue, or projects that want to employ micro front ends using both technologies. 

It will consume your React components, and generate out a new directory full of Vue components.

Optionally, you can also roll them into one nice exported bundle per framework (i.e - `bundle.react.js`, `bundle.vue.js`) 📦


_Flip initially started as a fork of [this babel plugin](https://github.com/vueact/babel-plugin-transform-react-to-vue) and still uses a modified version of it under the hood._


## How to use

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

and it will generate the following folder structure:

```
 - dist
 | - react
    | - button
    | - form
 | - vue
    | - button
    | - form
 | - bundles
    | - bundle.react.js
    | - bundle.vue.js
```

### Styling

While not necessary, flip is compatible with [styled-components](https://www.styled-components.com/) (it even handles remapping the react/vue styled component import 😎)


## Contributing

Please read [our contribution guide](CONTRIBUTING.md) for details on the development process, and the process for submitting a pull request

With any contribution, you accept all conditions implicitly defined in the [Code of Conduct](CODE_OF_CONDUCT.md).

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) for more details

## Authors

Quinn Langille - [email](mailto:quinn.langille@ssense.com)
