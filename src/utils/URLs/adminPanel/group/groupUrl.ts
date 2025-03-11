import Url from "@/utils/dataFetching/urls";

class GroupUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/groups/groups";
  }

  public get createGroup() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listGroup() {
    const basePath = `${this.baseUrlPath}/`;
    return new URL(basePath, this.origin);
  }

  public deleteGroup(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

  public editGroup(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }
}

const groupUrls = new GroupUrls();

export default groupUrls;
