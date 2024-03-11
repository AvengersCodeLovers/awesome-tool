const route = (
  processArgv: string[]
): {
  isValid: boolean;
  moduleName: string;
} => {
  const args = Object.values(processArgv);
  let moduleName = "";

  // get first occur of index.js in args
  for (let i = 0; i < args.length; i++) {
    if (args[i].includes("index.js")) {
      moduleName = args[i + 1];
      break;
    }
  }

  return {
    isValid: moduleName !== "",
    moduleName: moduleName,
  };
};

export { route };
