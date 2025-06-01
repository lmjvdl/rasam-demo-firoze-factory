import Url from "@/utils/url/general/urls";

class AlarmDetailUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/notifications/alarm_detail";
  }

  public get createAlarmDetail() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listAlarmDetail() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteAlarmDetail(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }

  public editAlarmDetail(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }
}

const alarmDetailUrls = new AlarmDetailUrls();

export default alarmDetailUrls;