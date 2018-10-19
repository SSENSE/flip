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
  try {
    console.log("\nChecking dist directory structure...");
    const frameworks = ["react", "vue"]
    await dirCheck(frameworks, 'styles');

    console.log("\nTranspiling components...");
    await translateComponents(pathToComponents);

    console.log("\nBuilding exports...");
    await generateExports("react");
    await generateExports("vue");
  } catch (e) {
    console.log(e);
  }
};
