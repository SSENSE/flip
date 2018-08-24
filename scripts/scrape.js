import * as fs from 'fs'
import { vueToReact } from "./transpile";

export const generateExports = async (library) => {
    const imports = [];
    const exports = [];
    fs.readdir(`dist/${library}`, (err, result) => {
        result.filter(r => !r.includes('.')).forEach(dirName => {
            // we use ../ vs absolute import because rollup needs to see a relative path
            imports.push(`import ${dirName} from '../${library}/${dirName}';`);
            exports.push(`exports.${dirName} = ${dirName};`);
        });

        fs.writeFileSync(`dist/${library}/index.js`, imports.join('\n'));
        fs.appendFileSync(`dist/${library}/index.js`, '\n' + exports.join('\n'));
    });
};

export const transpileComponenets = async () => {
    fs.readdir('src/components', (err, result) => {
        result.forEach(dirName => {
            const path = `src/components/${dirName}`;
            vueToReact(path)
        });
        console.log('Component transpilation complete')
    });
};
