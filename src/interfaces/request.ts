export interface IRequest {
  url?: string;
  path?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit | null;
  query?: Record<string, string | string[]>;
  headers?: Record<string, string>;
}

export interface IGetFiles {
  bucketName: string;
  prefix?: string;
  delimeter?: string;
}

export interface IDeleteFile {
  bucketName: string;
  key: string;
}

export interface IViewFiles {
  bucketName: string;
  files: {
    key: string;
    expiresIn: number;
  }[];
}

export interface IUploadFile {
  bucketName: string;
  files: {
    key: string;
    contentType: string;
    expiresIn: number;
  }[];
}
