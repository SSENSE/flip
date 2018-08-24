import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'dist/vue/index.js',
    output: {
        file: 'dist/bundles/bundle.vue.js',
        format: 'cjs',
    },
    // All the used libs needs to be here
    external: [
        'vue-styled-components'
    ],
    plugins: [
        resolve(),
        babel({
            "presets": [
                [
                    "@babel/env",
                    {
                        "modules": false
                    }
                ]
            ],
            exclude: 'node_modules/**'
        })
    ]
};
