import chalk from "chalk";

export enum LogType {
  WARN = "warn",
  ERROR = "error",
  INFO = "info",
}

export const log = (message: string, type?: LogType) => {
  if (type === LogType.WARN) {
    console.log(chalk.blue("[WARN] " + message));
    return;
  }
  if (type === LogType.ERROR) {
    console.error(chalk.red("[ERROR] " + message));
    return;
  }
  console.log(chalk.blue("[INFO] " + message));
};
