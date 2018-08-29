import { translateComponents, generateExports, dirCheck } from "./scrape";
/*

/*
*
* Run our component generation suite
*
* Args:
*  - framework: string
*
* */ export const generateComponents = async pathToComponents => {
  console.log("\nChecking dist directory structure...");
  await dirCheck("react");
  await dirCheck("vue");

  console.log("\nTranspiling components...");
  await translateComponents(pathToComponents);

  console.log("\nBuilding exports...");
  await generateExports("react");
  await generateExports("vue");
};
