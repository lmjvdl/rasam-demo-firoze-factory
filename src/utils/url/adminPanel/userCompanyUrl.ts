import Url from "@/utils/dataFetching/urls";

class UserCompanyUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/companies";
  }

  public get createUserCompany() {
    const basePath = `${this.baseUrlPath}/user/add/`;
    return new URL(basePath, this.origin);
  }

  public listUserCompany(id: number) {
    const basePath = `${this.baseUrlPath}/user_list/${id}`;
    return new URL(basePath, this.origin).toString();
  }

  public deleteUserCompany(id: number) {
    const basePath = `${this.baseUrlPath}/user/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

  public editUserCompany(id: number) {
    const basePath = `${this.baseUrlPath}/user/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

}

const userCompanyUrls = new UserCompanyUrls();

export default userCompanyUrls;
