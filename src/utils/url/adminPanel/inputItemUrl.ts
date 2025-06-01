import Url from "@/utils/url/general/urls";

class InputItemUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/reports/input_item";
  }

  public get createInputItem() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listInputItem() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteInputItem(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }

  public editInputItem(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }
}

const inputItemsUrls = new InputItemUrls();

export default inputItemsUrls;