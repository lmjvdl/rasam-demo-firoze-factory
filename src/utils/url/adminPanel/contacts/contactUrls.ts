import Url from "@/utils/dataFetching/urls";

class ContactsUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/accounts/contacts";
  }

  public get createContacts() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listContacts() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteContacts(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }

  public editContacts(id: number) {
    const basePath = `${this.baseUrlPath}/${id}/`;
    return new URL(basePath, this.origin).toString();
  }
}

const contactsUrls = new ContactsUrls();

export default contactsUrls;
