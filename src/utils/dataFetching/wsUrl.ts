export const isProduction = process.env.NODE_ENV === "development";
const local = "ws://dev.rasamiot.com/ws/admin/";

export default class WsUrl {
    private static instance: WsUrl;
    public readonly origin: string;
    protected baseUrlPath = "/ws/admin/";
  
    protected constructor() {
      this.origin = isProduction
        ? local
        : `ws://${new URL(window.location.href).host}`;
    }
  
    public static getInstance(): WsUrl {
      if (!WsUrl.instance) {
        WsUrl.instance = new WsUrl();
      }
      return WsUrl.instance;
    }
  }
  