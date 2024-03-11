import { PrettierModule } from "../module/prettier/prettier.module";
import { sayHello } from "./common/hello";
import { LogType, log } from "./common/log";
import { route } from "./common/route";

const loadModule = () => {
  const load = [PrettierModule];
  load.forEach((module) => {
    log(`Module ${(module as any).moduleName} loaded`);
  });
  return load;
};

const getModule = (moduleName: string) => {
  const modules = loadModule();
  return modules.filter(
    (module) => (module as any).moduleName === moduleName
  )[0];
};

function processing(moduleName: string) {
  const module = getModule(moduleName);
  if (module) {
    log(`Processing module "${moduleName}"`);
    const m = new module();
    (m as any) // https://github.com/Microsoft/TypeScript/issues/4881
      .run();
  } else {
    log(`⚠️ Module "${moduleName}" not found`, LogType.WARN);
  }
}

export const bootstrap = async () => {
  await sayHello(() => {
    const args = process.argv;
    const { isValid, moduleName } = route(args);

    if (isValid) {
      processing(moduleName);
    } else {
      console.warn("⚠️ Invalid command. Module not found.");
    }
  });
};
