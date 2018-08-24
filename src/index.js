import { transpileComponenets, generateExports } from "../scripts/scrape";
import { dirCheck } from "../scripts/transpile";

const generateComponents = async () => {
        dirCheck('button');
        dirCheck('input');
        await transpileComponenets();
        await generateExports('react');
        await generateExports('vue');

};

(async () => await generateComponents())();
