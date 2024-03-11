import { PrettierModule } from "../module/prettier/prettier.module";
import { sayHello } from "./common/hello";
import { LogType, log } from "./common/log";
import { route } from "./common/route";

export const allModules = [PrettierModule];

function processing(moduleName: string) {
  log(`🚀 Checking "${moduleName}" ...`);
  const module = allModules.find(
    (module) => (module as any).moduleName === moduleName
  );
  if (module) {
    const m = new module();
    (m as any) // https://github.com/Microsoft/TypeScript/issues/4881
      .run();
  }
}

const loadModule = () => {
  const allModuleNames = allModules.map((module) => (module as any).moduleName);

  let targetModuleNames: string[] = [];
  const { modules } = route();
  if (modules.length === 0) {
    targetModuleNames = allModuleNames;
  } else {
    targetModuleNames = modules.filter((module) =>
      allModuleNames.includes(module)
    );

    const notFoundModules = modules.filter(
      (module) => !allModuleNames.includes(module)
    );
    if (notFoundModules.length > 0) {
      log(`⚠️ Modules "${notFoundModules.join(", ")}" not found`, LogType.WARN);
    }
  }

  targetModuleNames = Array.from(new Set(targetModuleNames));

  for (const moduleName of targetModuleNames) {
    processing(moduleName);
  }
};

export const bootstrap = async () => {
  await sayHello(() => {
    loadModule();
  });
};
