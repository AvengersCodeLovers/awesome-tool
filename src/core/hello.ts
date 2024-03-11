import figlet from "figlet";
import { common } from "../config";

const sayHello = async (callback: () => any) => {
  figlet(`      ${common.name}\n`, (err, data) => {
    if (err) {
      return;
    }
    console.log(data);
    console.log(`Develop by ${common.author}`);
    callback();
  });
};

export { sayHello };
