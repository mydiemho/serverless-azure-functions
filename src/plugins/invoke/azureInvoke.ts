import { isAbsolute, join } from "path";
import Serverless from "serverless";
import AzureProvider from "../../provider/azureProvider";
import { InvokeService } from "../../services/invokeService";
import fs from "fs";

export class AzureInvoke {
  public hooks: { [eventName: string]: Promise<any> };
  public commands: any;
  private provider: AzureProvider;
  private service: InvokeService;

  public constructor(private serverless: Serverless, private options: Serverless.Options) {
    this.provider = (this.serverless.getProvider("azure") as any) as AzureProvider;
    const path = this.options["path"];

    if (path) {
      const absolutePath = isAbsolute(path)
        ? path
        : join(this.serverless.config.servicePath, path);

      if (!this.serverless.utils.fileExistsSync(absolutePath)) {
        throw new Error("The file you provided does not exist.");
      }
      this.options["data"] = this.serverless.utils.readFileSync(absolutePath);
    }

    this.hooks = {
      "before:invoke:invoke": this.provider.getAdminKey.bind(this),
      "invoke:invoke": this.invoke.bind(this)
    };

    this.commands = {
      invoke: {
        usage: "Invoke command",
        lifecycleEvents: [
          "invoke"
        ],
        options: {
          function: {
            usage: "Function to call",
            shortcut: "f",
          },
          path: {
            usage: "Path to file to put in body",
            shortcut: "p"
          },
          data: {
            usage: "Data string for body of request",
            shortcut: "d"
          },
          name: {
            usage: "Name of the function to invoke",
            shortcut: "n"
          }
        }
      }
    }
    this.service = new InvokeService(this.serverless, this.options);  
  }

  private async invoke() {
    //this.service.invoke();
    if (!("name" in this.options)) {
      this.serverless.cli.log("Need to provide a name of function to invoke");
      return;
    }
    const funcToInvoke = this.options["name"];
    const exists = fs.existsSync(funcToInvoke);
    if (!exists) {
      this.serverless.cli.log(`Function ${funcToInvoke} does not exist`);
      return;
    }
    this.serverless.cli.log(`Invoking ${funcToInvoke}`);
    //const functionObject = this.serverless.service.getFunction(funcToInvoke);

    // const func = this.options.function;
    // const functionObject = this.serverless.service.getFunction(func);
    // const eventType = Object.keys(functionObject["events"][0])[0];

    // if (!this.options["data"]) {
    //   this.options["data"] = {};
    // }

    // return this.provider.invoke(func, eventType, this.options["data"]);
  }
}
