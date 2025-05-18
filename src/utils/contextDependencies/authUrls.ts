import Url from "@/utils/dataFetching/urls";

class AuthUrls extends Url {
  public constructor() {
    super();
    this.baseUrlPath += "/accounts/auth";
  }

  public get login() {
    const loginPath = `${this.baseUrlPath}/login/`;
    return new URL(loginPath, this.origin);
  }

  public get refreshToken() {
    const refreshTokenPath = `${this.baseUrlPath}/refresh/`;
    return new URL(refreshTokenPath, this.origin);
  }
}

const authUrls = new AuthUrls();

export default authUrls;
