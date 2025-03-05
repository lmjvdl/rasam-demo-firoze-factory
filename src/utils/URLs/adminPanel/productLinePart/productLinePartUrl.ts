import Url from "@/utils/dataFetching/urls";

class ProductLinePartUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/devices/product_line_part";
  }

  public get createProductLinePart() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listProductLinePart() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteProductLinePart(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

  public editProductLinePart(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }
}

const productLinePartUrls = new ProductLinePartUrls();

export default productLinePartUrls;
