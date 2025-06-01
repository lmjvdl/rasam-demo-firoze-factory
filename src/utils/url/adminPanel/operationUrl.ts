import Url from "@/utils/url/general/urls";

class OperationUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/devices";
  }
  public get createOperation() {
    const basePath = `${this.baseUrlPath}/aggregate/create/`;
    return new URL(basePath, this.origin);
  }

  public get checkCommonDataType() {
    const basePath = `${this.baseUrlPath}/common-data-types/`;
    return new URL(basePath, this.origin);
  }


  public get listOperation() {
    const basePath = `${this.baseUrlPath}/aggregate/List/`;
    return new URL(basePath, this.origin);
  }

  public deleteOperation(id: number) {
    const basePath = `${this.baseUrlPath}/aggregate/${id}`;
    return new URL(basePath, this.origin).toString();
  }

  public editOperation(id: number) {
    const basePath = `${this.baseUrlPath}/aggregate/${id}`;
    return new URL(basePath, this.origin).toString();
  }
}

const operationUrls = new OperationUrls();

export default operationUrls;
