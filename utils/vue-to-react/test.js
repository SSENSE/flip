import { transformFileSync } from "@babel/core";
import * as fs from 'fs'

const test = transformFileSync('src/components/button/index.js',{
    babelrc: true,
});

fs.writeFile('./compiled.js', test)
