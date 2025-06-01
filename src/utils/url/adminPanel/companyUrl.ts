import Url from "@/utils/url/general/urls";

class CompanyUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/companies";
  }

  public get createCompany() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listCompany() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteCompany(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

  public editCompany(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

  public usersViewCompany(compnay: number) {
    const basePath = `${this.baseUrlPath}/user_list/${compnay}`;
    return new URL(basePath, this.origin).toString();
  }

  public editViewCompany(compnay: number) {
    const basePath = `${this.baseUrlPath}/user_list/${compnay}/`;
    return new URL(basePath, this.origin).toString();
  }
}

const companyUrls = new CompanyUrls();

export default companyUrls;
