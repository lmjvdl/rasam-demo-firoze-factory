import Url from "@/utils/dataFetching/urls";

class IntervalUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/reports/interval";
  }

  public get createInterval() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listInterval() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteInterval(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }

  public editInterval(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }
}

const intervalUrls = new IntervalUrls();

export default intervalUrls;