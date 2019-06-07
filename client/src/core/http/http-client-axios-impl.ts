import { HttpClient, HttpConfig, HttpError, HttpResponse, Method } from '@/core/http/http-client.interface';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

function axiosConfigTransformer(method: Method, original?: HttpConfig): AxiosRequestConfig {
  const result: AxiosRequestConfig = {
    method,
  };
  if (!original) {
    return {};
  }
  const {headers, params} = original;
  if (['get', 'delete'].indexOf(method.toLowerCase()) !== -1) {
    result.params = params;
  }
  if (headers) {
    result.headers = headers;
  }
  return result;
}

function axiosResponseTransformer<T>({status: statusCode, data}: AxiosResponse): HttpResponse<T> {
  return {
    statusCode,
    data,
  };
}

export class HttpClientAxiosImpl implements HttpClient {

  public async post<T>(url: string, config?: HttpConfig): Promise<HttpResponse<T>> {
    const data = config && config.params;
    return axios.post(url, data, axiosConfigTransformer('post', config))
      .then((resp) => axiosResponseTransformer<T>(resp));
  }

  public get<T>(url: string, config?: HttpConfig): Promise<HttpResponse<T>> {
    const data = config && config.params;
    return axios.get(url, axiosConfigTransformer('get', config))
      .then((resp) => axiosResponseTransformer<T>(resp));
  }

  public convertError<T>(error: AxiosError<T>): HttpError<T> {
    const statusCode = error.response && error.response.status ? error.response.status : undefined;
    const data = error.response ? error.response.data : undefined;
    return new HttpError<T>('Request error', data, statusCode, error);
  }
}
