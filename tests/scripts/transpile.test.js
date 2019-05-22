import { translateComponents } from '../../src/scripts/transpile'
import { dirCheck } from '../../src/scripts/index'
import { expect } from 'chai';

const fs = require('fs-extra');

describe('scripts/transpile', () => {

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
        const vueDir = fs.readdirSync('dist/vue');

        // check that the transpiler script creates mirrored directory structures
        expect(reactDir).to.deep.equal(vueDir);
    })

    it('correctly transpiles from react components into vue components', async () => {
        await translateComponents('tests/data/components');

        const vueDir = fs.readdirSync('dist/vue');

        // check that each generated component matches our pre-transpiled mocks
        vueDir.forEach(component => {
            let generatedComponent;
            if (fs.existsSync(`dist/vue/${component}/index.tsx`)) {
                generatedComponent = fs.readFileSync(`dist/vue/${component}/index.tsx`, 'utf8')
            } else {
                generatedComponent = fs.readFileSync(`dist/vue/${component}/index.jsx`, 'utf8')
            }

            const mockComponent = fs.readFileSync(`tests/data/transpiled-vue-mocks/${component}/index.js`, 'utf8')

            expect(generatedComponent).to.deep.equal(mockComponent);
        })
    })
})