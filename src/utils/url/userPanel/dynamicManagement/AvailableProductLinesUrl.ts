import Url from "@/utils/url/general/urls";

class AvailableProductLinesUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/accounts/user/company-product-line";
  }

  public ListOfAvailableProductLines(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }
}

const availableProductLinesUrls = new AvailableProductLinesUrls();

export default availableProductLinesUrls;
