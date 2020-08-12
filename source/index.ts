import { IObjectStrings, IOptions } from "./interfaces";
let fetch = require("node-fetch").default;

try {
  if (!window) ({ fetch } = window);
} catch (error) {
  console.log("window is not defined");
}

class RestRequestor {
  private _baseUrl: string;

  private successStatuses = [200];

  private defaultErrors: IObjectStrings = {
    500: "Ошибка сервера",
    504: "Превышено время ожидания ответа от сервера",
  };

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  getQueryValue(key: string, value: string): string {
    if (Array.isArray(value)) {
      return value.map((val) => this.getQueryValue(key, val)).join("&");
    }

    return `${key}=${encodeURIComponent(value)}`;
  }

  private getQuery(obj: IObjectStrings) {
    let res = "";
    const keys = Object.keys(obj);

    for (let j = 0; j < keys.length; ++j) {
      const i = keys[j];

      if (obj[i] !== undefined) {
        const pair = this.getQueryValue(i, obj[i]);
        res += `${res ? "&" : ""}${pair}`;
      }
    }

    return res;
  }

  async execute(pathname: string, options: IOptions = {}) {
    const {
      done,
      body,
      query,
      errors,
      failed,
      isBlob,
      headers,
      success,
      isAbsolutePath,
      successStatuses,
    } = options;

    let status;
    let path = `${isAbsolutePath ? "" : this._baseUrl}${pathname}`;

    if (query && Object.keys(query).length) {
      path += `?${this.getQuery(query)}`;
    }

    let response: Blob | object = { status: "Development request error" };
    const requestOptions: IOptions = {
      method: "GET",
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}),
      },
    };

    try {
      const request = await fetch(path, requestOptions);

      if (isBlob) response = await request.blob();
      else response = await request.json();

      status = await request.status;
      const statuses = successStatuses || this.successStatuses;
      const errorsStatuses = { ...errors, ...this.defaultErrors };

      const isSuccessStatus = statuses.indexOf(status) !== -1;

      if (isSuccessStatus) {
        if (success) await success(response, status);
      } else {
        if (failed) failed(response, status);
        else {
          for (const key in errorsStatuses) {
            if (errorsStatuses.hasOwnProperty(key)) {
              if (Number(status) === Number(key)) {
                console.error(path, errorsStatuses[key]);
              }
            }
          }
        }
      }

      if (done) done(response, status);
      return response;
    } catch (error) {
      if (done) done({ message: "error fetch" }, 500);
      console.log(`ERROR API REQUEST: ${path} ${status}`);
    }

    return response;
  }
}

export default RestRequestor;
