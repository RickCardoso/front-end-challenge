import httpClient from '@/core/http';
import config from '@/core/config';
import { Service } from '@/core/services/services.interface';
import { HttpClient, HttpResponse } from '@/core/http/http-client.interface';
import {
  ClientResponse,
  ClientService,
  CreateClientServerParams,
} from '@/core/services/client/client-service.interface';

class ClientServiceImpl extends Service implements ClientService {
  constructor(protected http: HttpClient) {
    super();
  }

  public async list(): Promise<HttpResponse<ClientResponse>> {
    return this.http.get<ClientResponse>(`${config.API_URL}clients`)
      .catch((e) => this.handleError(e));
  }

  public async create(params: CreateClientServerParams): Promise<HttpResponse<ClientResponse>> {
    return this.http.post<ClientResponse>(`${config.API_URL}client`, {
      params,
    }).catch((e) => this.handleError(e));
  }

}

export default new ClientServiceImpl(httpClient);
