import chalk from "chalk";

export enum LogType {
  WARN = "warn",
  ERROR = "error",
  INFO = "info",
  SUGGEST = "suggest",
}

export const log = (message: string, type?: LogType) => {
  if (type === LogType.WARN) {
    console.log(chalk.yellow("[WARN] " + message));
    return;
  }
  if (type === LogType.ERROR) {
    console.error(chalk.red("[ERROR] " + message));
    return;
  }

  console.log(chalk.blue("[INFO] " + message));
};

export enum ReportLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

interface Report {
  level: ReportLevel;
  message: string;
  suggestions?: string[];
}

export const printReport = (report: Report) => {
  const { level, message: messages, suggestions: suggestions } = report;
  if (level === ReportLevel.INFO) {
    log(messages, LogType.INFO);
  }
  if (level === ReportLevel.WARN) {
    log(messages, LogType.WARN);
  }
  if (level === ReportLevel.ERROR) {
    log(messages, LogType.ERROR);
  }
  if (suggestions) {
    console.log(chalk.cyan("\n👉 Suggestion for you: "));
    suggestions.forEach((message) => {
      console.log(chalk.cyan(message));
    });
    console.log(`\n`);
  }
};
