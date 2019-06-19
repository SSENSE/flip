import { translateComponents } from '../../src/scripts/transpile'
import { dirCheck } from '../../src/scripts/index'
import { expect } from 'chai';

const fs = require('fs-extra');

describe('scripts/transpile', () => {
    const transpiledVuePath = 'dist/vue';

    beforeEach(async () => {
        // setup clean dist directory
        await dirCheck(['react', 'vue'], 'styles')
    })

    afterEach(() => {
        // remove the dist directory so we can start fresh each test
        if(fs.pathExistsSync('dist')) {
            fs.remove('dist');
        }
    })

    it('transpiles the components into react and vue directories', async () => {
        await translateComponents('tests/data/components');

        const reactDir = fs.readdirSync('dist/react');
        const vueDir = fs.readdirSync(transpiledVuePath);

        // check that the transpiler script creates mirrored directory structures
        expect(reactDir).to.deep.equal(vueDir);
    })

    it('correctly transpiles from react components into vue components', async () => {
        await translateComponents('tests/data/components');

        const vueDir = fs.readdirSync(transpiledVuePath);

        // check that each generated component matches our pre-transpiled mocks
        vueDir.forEach(component => {
            const transpiledVueComponentPath = `${transpiledVuePath}/${component}`;
            const isDirExists = fs.existsSync(transpiledVueComponentPath) && fs.lstatSync(transpiledVueComponentPath).isDirectory(); 
            if (!isDirExists) return;

            let generatedComponent;
            if (fs.existsSync(`${transpiledVueComponentPath}/index.tsx`)) {
                generatedComponent = fs.readFileSync(`${transpiledVueComponentPath}/index.tsx`, 'utf8')
            } else {
                generatedComponent = fs.readFileSync(`${transpiledVueComponentPath}/index.jsx`, 'utf8')
            }

            const transpiledMockPath = `tests/data/transpiled-vue-mocks/${component}`;
            const transpiledMockFile = `${transpiledMockPath}/index.js`

            if (fs.existsSync(transpiledMockFile)) {
                const mockComponent = fs.readFileSync(transpiledMockFile, 'utf8')

                expect(generatedComponent).to.deep.equal(mockComponent);
            } else {
                console.error(`Transpiled mock for ${component} doesn't exist. Saving a new one.`);
                fs.mkdirSync(transpiledMockPath);
                fs.writeFileSync(transpiledMockFile, generatedComponent);
            }
        })
    })
})