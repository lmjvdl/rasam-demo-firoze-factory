import Url from "@/utils/dataFetching/urls";

class DeviceUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/devices";
  }

  public get createDevice() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listDevice() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteDevice(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

  public editDevice(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }
}

const deviceUrls = new DeviceUrls();

export default deviceUrls;
