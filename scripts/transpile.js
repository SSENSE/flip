import * as fs from 'fs'
import { transformFile } from '@babel/core'

export const vueToReact = (path) => {
    path += '/index.js';
    const splitPath = path.split('/');
    const dirName = splitPath[splitPath.length - 2];

    transformFile(path, null, async (err, result) => {
        if (err) {
            console.log(err)
        }

        const vuePath = `dist/vue/${dirName}/index.js`;
        const reactPath = `dist/react/${dirName}/index.js`;

        await dirCheck(dirName);

        fs.writeFileSync(vuePath, result.code);
        fs.copyFileSync(path, reactPath)
    });
};

export const dirCheck = (dirName) => {
    if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist');
    }

    if (!fs.existsSync('dist/vue')) {
        fs.mkdirSync(`dist/vue/`);
    }

    if (!fs.existsSync('dist/react')) {
        fs.mkdirSync(`dist/react/`);
    }

    if (!fs.existsSync(`dist/react/${dirName}`)) {
        fs.mkdirSync(`dist/react/${dirName}`)
    }

    if (!fs.existsSync(`dist/vue/${dirName}`)) {
        fs.mkdirSync(`dist/vue/${dirName}`)
    }
};
