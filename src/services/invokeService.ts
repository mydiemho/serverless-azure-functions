import { BaseService } from "./baseService"
import Serverless from "serverless";

export class InvokeService extends BaseService {
  public constructor(serverless: Serverless, options: Serverless.Options) {
    super(serverless, options);
  }

  public invoke(){
    if (!("function" in this.options)){
      // throw some error
    }
    const functionToInvoke = this.options.function;

  }
} 