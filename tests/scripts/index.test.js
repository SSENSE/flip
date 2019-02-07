import { generateComponents, dirCheck } from '../../src/scripts/index'
import { expect } from 'chai';

const fs = require('fs-extra');

describe('scripts/index.js', () => {
    afterEach(() => {
        // remove the directory so we can start fresh each test
        if(fs.pathExistsSync('dist')) {
            fs.remove('dist');
        }
    })

    it('generates the dist directory', async () => {
        await dirCheck(['react', 'vue'], 'tests/data/styles')
        expect(fs.pathExistsSync('dist')).to.equal(true);
        expect(fs.readdirSync('dist')).to.deep.equal([ 'react', 'styles', 'vue' ]);
    })

    it('generates index.js files inside each directory for export', async () => {
        await generateComponents('tests/data/components', "data/styles", false);

        expect(fs.readdirSync('dist/react')).to.include('index.js');
        expect(fs.readdirSync('dist/vue')).to.include('index.js');
    })
})
