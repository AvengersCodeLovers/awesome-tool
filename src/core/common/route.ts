import { Command } from "commander";

const route = (): {
  modules: string[];
} => {
  const modules: string[] = [];

  const program = new Command();
  program.option("-p, --prettier", "Check prettier");
  program.parse(process.argv);

  const options = program.opts();
  if (options.prettier) {
    modules.push("prettier");
  }

  return {
    modules: [],
  };
};

export { route };
