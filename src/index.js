import {
  translateComponents,
  generateExports,
  dirCheck
} from "../scripts/scrape";
/*
*
* Run our component generation suite
*
* Args:
*  - framework: string
*
* */
const generateComponents = async pathToComponents => {
  await dirCheck("react");
  await dirCheck("vue");

  await translateComponents(pathToComponents);

  await generateExports("react");
  await generateExports("vue");
};

generateComponents("src/components");
