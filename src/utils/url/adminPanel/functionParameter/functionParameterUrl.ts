import Url from "@/utils/dataFetching/urls";

class FunctionParameterUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/notifications/function_parameter";
  }

  public get createFunctionParameter() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listFunctionParameter() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteFunctionParameter(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }

  public editFunctionParameter(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }
}

const functionParameterUrls = new FunctionParameterUrls();

export default functionParameterUrls;