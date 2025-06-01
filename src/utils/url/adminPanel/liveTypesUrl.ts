import Url from "@/utils/url/general/urls";

class LiveTypesUrls extends Url {

  public constructor() {
    super();
    this.baseUrlPath += "/devices/live_chart";
  }

  public get createLiveTypes() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listLiveTypes() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteLiveTypes(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }

  public editLiveTypes(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }
}

const liveTypesUrls = new LiveTypesUrls();

export default liveTypesUrls;
