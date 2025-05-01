import Url from "@/utils/dataFetching/urls";

class ReportUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/reports/report";
  }

  public get createReport() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listReport() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteReport(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }

  public editReport(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }
}

const reportUrls = new ReportUrls();

export default reportUrls;