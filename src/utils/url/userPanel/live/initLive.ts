import Url from "@/utils/url/general/urls";

class InitLiveDataUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/data/data/init_live";
  }

  public initDataLive(productLinePart: number) {
    const basePath = `${this.baseUrlPath}/${productLinePart}`;
    return new URL(basePath, this.origin).toString();
  }
}

const initLiveDataUrls = new InitLiveDataUrls();

export default initLiveDataUrls;
