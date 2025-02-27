import Url from "@/utils/dataFetching/urls";

class CompanyUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/companies";
  }

  public get createCompany() {
    const reportPath = `${this.baseUrlPath}/create/`;
    return new URL(reportPath, this.origin);
  }

  public get listCompany() {
    const reportPath = `${this.baseUrlPath}/list/`;
    return new URL(reportPath, this.origin);
  }

  public deleteCompany(id: number) {
    const reportPath = `${this.baseUrlPath}/${id}/`;
    return new URL(reportPath, this.origin).toString();
  }

  public editCompany(id: number) {
    const reportPath = `${this.baseUrlPath}/${id}/`;
    return new URL(reportPath, this.origin).toString();
  }
}

const companyUrls = new CompanyUrls();

export default companyUrls;
