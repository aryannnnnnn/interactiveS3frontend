import type { IRequest } from "@/interfaces/request";
const su = import.meta.env.VITE_BACKEND_URL;

async function fetchData({
  url = su,
  path = "",
  method = "GET",
  body = undefined,
  headers = undefined,
  query = undefined,
}: IRequest) {
  try {
    const options = {
      method,
      headers,
      body,
    };

    if (path) {
      url += path;
    }

    if (query) {
      url = `${url}?${new URLSearchParams(query as Record<string, string>).toString()}`;
    }
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default fetchData;
