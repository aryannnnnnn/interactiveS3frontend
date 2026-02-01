export interface IRequest {
  url?: string;
  path?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit | null;
  query?: Record<string, string | string[]>;
  headers?: Record<string, string>;
}
