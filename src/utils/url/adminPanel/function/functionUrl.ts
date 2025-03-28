import Url from "@/utils/dataFetching/urls";

class FunctionUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/notifications/function";
  }

  public get createFunction() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listFunction() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteFunction(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }

  public editFunction(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }
}

const functionUrls = new FunctionUrls();

export default functionUrls;