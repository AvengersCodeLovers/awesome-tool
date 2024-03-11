import { Module } from "../../core";
import { PrettierController } from "./prettier.controller";

@Module({
  name: "prettier",
  description:
    "Prettier is an opinionated code formatter. Check if your code is formatted correctly.",
  controller: PrettierController,
})
export class PrettierModule {}
