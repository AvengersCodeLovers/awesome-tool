import { Command } from "commander";
import { BaseController, StepResult, execPromise } from "../../core";
import { ReportLevel, printReport } from "../../core/common/log";

export class PrettierController extends BaseController {
  public async run(): Promise<StepResult> {
    const program = new Command();
    program.option("-f, --fix", "prettier fix");
    program.parse(process.argv);

    // E.g: Get options from command line
    // const options = program.opts();
    // console.log(options);

    const { isInstalled } = await this.checkIfPrettierInstalled();
    if (isInstalled) {
      const { hasError } = await this.checkPrettier();
      if (hasError) {
        return {
          isSuccess: false,
          message: "Prettier check failed",
        };
      }
    }
    return {
      isSuccess: true,
    };
  }

  private async checkIfPrettierInstalled(): Promise<{
    isInstalled: boolean;
  }> {
    const { stdout } = await execPromise("npm ls --depth=0 --json");
    const packageJson = JSON.parse(stdout);

    const isPrettierInstalled = !!(
      packageJson?.dependencies?.prettier ||
      packageJson?.devDependencies?.prettier
    );

    if (isPrettierInstalled) {
      printReport({
        level: ReportLevel.INFO,
        message: "Prettier is installed in current repository",
      });
      return {
        isInstalled: true,
      };
    } else {
      printReport({
        level: ReportLevel.WARN,
        message: "Prettier is not installed in current repository",
        suggestions: [
          "Please install prettier by running `npm install --save-dev prettier`",
          "READ MORE: https://viblo.asia/p/su-dung-prettier-de-format-code-Az45bnOQ5xY",
        ],
      });
      return {
        isInstalled: false,
      };
    }
  }

  private async checkPrettier(): Promise<{
    hasError: boolean;
  }> {
    let hasError = false;
    let stdout = "";
    try {
      const output = await execPromise("prettier . --list-different");
      stdout = output.stdout;
    } catch (e) {
      hasError = true;
      stdout = (e as any)?.stdout;
    }

    if (!hasError) {
      printReport({
        level: ReportLevel.INFO,
        message: "✅ The result of prettier check is good",
      });
      return {
        hasError: true,
      };
    } else {
      const files = stdout.split("\n").filter((file) => file);
      const txt =
        files.length + (files.length === 1 ? " file is" : " files are");
      printReport({
        level: ReportLevel.WARN,
        message:
          `⚠️  The result of prettier check is bad (${txt} not formatted):\n` +
          files.map((file) => `- ${file}`).join("\n"),
        suggestions: [
          "Please run `prettier --write .` to format the code",
          "READ MORE: https://viblo.asia/p/su-dung-prettier-de-format-code-Az45bnOQ5xY",
        ],
      });
      return {
        hasError: false,
      };
    }
  }
}
