import { isAbsolute, join } from "path";
import Serverless from "serverless";
import AzureProvider from "../../provider/azureProvider";
import { InvokeService } from "../../services/invokeService";

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
          }
        }
      }
    }
    this.service = new InvokeService(this.serverless, this.options);  
  }

  private async invoke() {
    this.service.invoke();


    // const func = this.options.function;
    // const functionObject = this.serverless.service.getFunction(func);
    // const eventType = Object.keys(functionObject["events"][0])[0];

    // if (!this.options["data"]) {
    //   this.options["data"] = {};
    // }

    // return this.provider.invoke(func, eventType, this.options["data"]);
  }
}
