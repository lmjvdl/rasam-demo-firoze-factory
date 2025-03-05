import Url from "@/utils/dataFetching/urls";

class ImageUploadUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/admin/icons";
  }

  public get createImageUpload() {
    const basePath = `${this.baseUrlPath}/`;
    return new URL(basePath, this.origin);
  }

  public get listImageUpload() {
    const basePath = `${this.baseUrlPath}/`;
    return new URL(basePath, this.origin);
  }
}

const imageUploadUrls = new ImageUploadUrls();

export default imageUploadUrls;
