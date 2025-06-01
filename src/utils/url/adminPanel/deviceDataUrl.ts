import Url from "@/utils/url/general/urls";

class DeviceDataUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/devices/device_data";
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

const deviceDataUrls = new DeviceDataUrls();

export default deviceDataUrls;
