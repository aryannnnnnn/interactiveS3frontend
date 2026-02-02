import config from "../config/config";
import fetchData from "./fetch";
import type {
  IGetFiles,
  IDeleteFile,
  IViewFiles,
  IUploadFile,
} from "@/interfaces/request";

class files {
  async getBuckets() {
    try {
      const resp = await fetchData({
        url: config.url,
        path: "/get-buckets",
        method: "GET",
      });
      return resp;
    } catch (e) {
      console.log(e);
    }
  }

  async getFiles({ bucketName, prefix, delimeter }: IGetFiles) {
    try {
      if (!prefix) prefix = "";
      if (!delimeter) delimeter = "/";
      const resp = await fetchData({
        url: config.url,
        path: "/files",
        method: "GET",
        query: { bucketName, prefix, delimeter },
      });
      return resp;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteFile({ bucketName, key }: IDeleteFile) {
    try {
      const resp = await fetchData({
        url: config.url,
        path: "/delete-file",
        method: "DELETE",
        query: { bucketName, key },
      });
      return resp;
    } catch (e) {
      console.log(e);
    }
  }

  async viewFile({ bucketName, files }: IViewFiles) {
    try {
      const resp = await fetchData({
        url: config.url,
        path: "/view-file",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bucketName, files }),
      });
      return resp;
    } catch (e) {
      console.log(e);
    }
  }

  async uploadFile({ bucketName, files }: IUploadFile) {
    try {
      const resp = await fetchData({
        url: config.url,
        path: "/get-upload-file-url",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bucketName, files }),
      });
      return resp;
    } catch (e) {
      console.log(e);
    }
  }
}

export const filesProvider = new files();
