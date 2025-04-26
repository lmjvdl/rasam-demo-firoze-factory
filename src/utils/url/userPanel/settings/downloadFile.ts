import Url from "@/utils/dataFetching/urls";

class DownloadFileUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/logs";
  }

  public get jsonDownload() {
    const basePath = `${this.baseUrlPath}/json/`;
    return new URL(basePath, this.origin);
  }

  public get excelDownload() {
    const basePath = `${this.baseUrlPath}/excel/`;
    return new URL(basePath, this.origin);
  }
}

const downloadFileUrls = new DownloadFileUrls();

export default downloadFileUrls;
