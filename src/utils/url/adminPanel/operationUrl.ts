import Url from "@/utils/dataFetching/urls";

class OperationUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/devices/aggregate";
  }
  public get createOperation() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listOperation() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteOperation(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

  public editOperation(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }
}

const operationUrls = new OperationUrls();

export default operationUrls;
