export const isProduction = process.env.NODE_ENV === "development";
const local = "https://dev.rasamiot.com/";
// const ashkan = "http://192.168.3.74:8000/";


export default class Url {
  protected readonly origin: string;

  protected constructor() {
    this.origin = isProduction
      ? local
      : new URL(window.location.href).origin;
  }

  protected baseUrlPath = "api";
}