import Url from "@/utils/dataFetching/urls";

class ShiftUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/companies/shift";
  }
  public get createShift() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listShift() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteShift(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

  public editShift(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }
}

const shiftUrls = new ShiftUrls();

export default shiftUrls;
