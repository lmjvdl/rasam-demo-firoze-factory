import Url from "@/utils/dataFetching/urls";

class ProductLineUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/devices/product_line";
  }

  public get createProductLine() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listProductLine() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteProductLine(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

  public editProductLine(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }
}

const productLineUrls = new ProductLineUrls();

export default productLineUrls;
