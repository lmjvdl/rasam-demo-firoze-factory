export const isDevelopment = process.env.NODE_ENV === "development";
const local = "https://dev.rasamiot.com/";
// const ashkan = "http://192.168.3.74:8000/";

export default class Url {
  public readonly origin: string;

  constructor() {
    this.origin = isDevelopment
      ? local
      : new URL(window.location.href).origin;
  }

  public baseUrlPath = "api";
  
  public getResourceUrl(path: string): string {
    const cleanedPath = path.replace(/^\//, '');
    return `${this.origin}/${cleanedPath}`;
  }
}