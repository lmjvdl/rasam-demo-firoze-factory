import Url from "@/utils/dataFetching/urls";

class DeviceDataUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/devices/data_type";
  }

  public get createDeviceData() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listDeviceData() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteDeviceData(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

  public editDeviceData(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }
}

const userUrls = new DeviceDataUrls();

export default userUrls;
