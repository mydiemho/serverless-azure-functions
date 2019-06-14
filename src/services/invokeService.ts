import { BaseService } from "./baseService"
import Serverless from "serverless";

export class InvokeService extends BaseService {
  public constructor(serverless: Serverless, options: Serverless.Options) {
    super(serverless, options, false);
  }
/*
  public invoke(){
    if (!("function" in this.options)){
      // throw some error
      this.serverless.cli.log("Need to provide a name of function to be invoked");
      return;
    }

    const functionToInvoke = this.options["name"];
    const exists = fs.existsSync(functionToInvoke);
    if (exists) {
      this.serverless.cli.log(`Function ${functionToInvoke} does not exists`);
      return;
    }
    this.serverless.cli.log(`Invoking ${functionToInvoke}`);


  }
  public async getFunction(functionApp: Site, functionName: string): Promise<FunctionEnvelope> {
    const getFunctionUrl = `${this.baseUrl}${functionApp.id}/functions/${functionName}?api-version=2016-08-01`;
    const response = await this.sendApiRequest("GET", getFunctionUrl);

    if (response.status !== 200) {
      return null;
    }
    return response.data.properties;
  }*/
} 