import Url from "@/utils/dataFetching/urls";

class PositionUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/accounts/position";
  }
  public get createPosition() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listPosition() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deletePosition(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

  public editPosition(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }
}

const positionUrls = new PositionUrls();

export default positionUrls;
