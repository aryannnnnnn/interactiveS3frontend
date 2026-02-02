import fetchData from "./fetch";
import type { IRequest } from "@/interfaces/request";
import type { ILogin } from "@/interfaces/login";

class auth {
  async getToken({ secretAccessKey, accessToken, username, region }: ILogin) {
    try {
      const body = JSON.stringify({
        secretAccessKey,
        accessToken,
        username,
        region,
      });
      const resp = await fetchData({
        body,
        path: "/login",
        headers: { "Content-Type": "application/json" },
        method: "POST",
      } as IRequest);
      return resp;
    } catch (e) {
      console.log(e);
    }
  }
}

export const authProvider = new auth();
