import Url from "@/utils/url/general/urls";

class UserUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/accounts";
  }

  public get createUser() {
    const basePath = `${this.baseUrlPath}/register/`;
    return new URL(basePath, this.origin);
  }

  public get listUser() {
    const basePath = `${this.baseUrlPath}/`;
    return new URL(basePath, this.origin);
  }

  public deleteUser(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

  public editUser(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }
}

const userUrls = new UserUrls();

export default userUrls;
