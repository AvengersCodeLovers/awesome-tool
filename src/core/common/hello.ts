import figlet from "figlet";
import { common } from "../../config";
import chalk from "chalk";

const sayHello = async (callback: () => any) => {
  figlet(`      ${common.name}\n`, (err, data) => {
    if (err) {
      return;
    }
    console.log(chalk.green(data));
    console.log(`      Developed by ${common.author} with ❤️\n`);
    callback();
  });
};

export { sayHello };
