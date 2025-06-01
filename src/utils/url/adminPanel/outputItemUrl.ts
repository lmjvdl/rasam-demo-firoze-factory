import Url from "@/utils/url/general/urls";

class OutputItemUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/reports/output_item";
  }

  public get createOutputItem() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listOutputItem() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteOutputItem(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }

  public editOutputItem(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }
}

const outputItemUrls = new OutputItemUrls();

export default outputItemUrls;