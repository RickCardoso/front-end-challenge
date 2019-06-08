export interface HttpConfig {
  headers?: Headers;
  params?: object;
}

export interface HttpResponse<T> {
  statusCode: number;
  data: T;
}

export class HttpError<T> extends Error implements Partial<HttpResponse<T>> {
  constructor(message?: string, public data?: T, public statusCode?: number | undefined, originalError?: Error) {
    super(message);
  }
}

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH';

export interface HttpClient {
  post<T>(url: string, config?: HttpConfig): Promise<HttpResponse<T>>;
  get<T>(url: string, config?: HttpConfig): Promise<HttpResponse<T>>;
  patch<T>(url: string, config?: HttpConfig): Promise<HttpResponse<T>>;

  convertError<T>(error: any): HttpError<T>;
}
