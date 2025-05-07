import Url from "@/utils/dataFetching/urls";

class AlarmUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/notifications/alarm";
  }

  public get createAlarm() {
    const basePath = `${this.baseUrlPath}/create/`;
    return new URL(basePath, this.origin);
  }

  public get listAlarm() {
    const basePath = `${this.baseUrlPath}/list/`;
    return new URL(basePath, this.origin);
  }

  public deleteAlarm(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }

  public editAlarm(id: number) {
    const basePath = `${this.baseUrlPath}/${id}`;
    return new URL(basePath, this.origin).toString();
  }
}

const alarmUrls = new AlarmUrls();

export default alarmUrls;
