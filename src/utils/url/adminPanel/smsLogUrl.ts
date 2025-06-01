import Url from "@/utils/url/general/urls";

class SmsLogUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/notifications/sms_log";
  }

  public get listSmsLog() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }
}

const smsLogUrls = new SmsLogUrls();

export default smsLogUrls;
