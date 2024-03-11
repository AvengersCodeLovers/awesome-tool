export interface Options {
  params: Record<string, any>;
  config: Record<string, any>;
}

abstract class BaseController {
  abstract run(options: Options): any;
}

export { BaseController };
