import Url from "@/utils/dataFetching/urls";

class PermissionUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/permissions";
  }
  public get listPermission() {
    const basePath = `${this.baseUrlPath}/`;
    return new URL(basePath, this.origin);
  }
}

const permissionUrls = new PermissionUrls();

export default permissionUrls;
