import { HttpClient } from '@/core/http/http-client.interface';

export abstract class Service {
  protected abstract http: HttpClient;

  protected handleError(error: any): Promise<any> {
    throw this.http.convertError(error);
  }
}
