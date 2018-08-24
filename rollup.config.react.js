import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'dist/react/index.js',
    output: {
        file: 'dist/bundles/bundle.react.js',
        format: 'cjs'
    },
    // All the used libs needs to be here
    external: [
        'react',
        'react-proptypes',
        'styled-components',
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
