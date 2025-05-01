import Url from "@/utils/dataFetching/urls";

class DataTypeUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/devices/data_type";
  }

  public get createDataType() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listDataType() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteDataType(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }

  public editDataType(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }
}

const dataTypeUrls = new DataTypeUrls();

export default dataTypeUrls;
