import fetchData from "./fetch";
import type { IRequest } from "@/interfaces/request";
import type { ILogin } from "@/interfaces/login";

export async function getToken({
  secretAccessKey,
  accessToken,
  username,
  region,
}: ILogin) {
  try {
    const body = JSON.stringify({
      secretAccessKey,
      accessToken,
      username,
      region,
    });
    const data = await fetchData({
      body,
      path: "/login",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    } as IRequest);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
