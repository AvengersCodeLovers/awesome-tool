export type ModuleMetadata = {
  name: string;
  description: string;
  controller: any;
};

export function Module(metadata: ModuleMetadata) {
  return function (targetClass: any) {
    return class BaseModule extends targetClass {
      public static moduleName: string = metadata.name;
      public static description: string = metadata.description;
      public controller: any = new metadata.controller();

      public static help() {
        console.log("help");
      }

      public run() {
        this.controller.run();
      }
    } as any;
  };
}
