export interface IObjectStrings {
  [key: string]: string;
}

export interface IOptions {
  body?: BodyInit;
  isBlob?: boolean;
  headers?: HeadersInit;
  query?: IObjectStrings;
  errors?: IObjectStrings;
  isAbsolutePath?: boolean;
  successStatuses?: number[];
  method?: "GET" | "POST" | "PUT" | "DELETE";
  done?: (response: any, status: number) => void;
  failed?: (response: any, status: number) => void;
  success?: (response: any, status: number) => void;
}
