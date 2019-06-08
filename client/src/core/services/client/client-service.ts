import httpClient from '@/core/http';
import config from '@/core/config';
import { Service } from '@/core/services/services.interface';
import { HttpClient, HttpResponse } from '@/core/http/http-client.interface';
import {
  Client,
  ClientDetailResponse,
  ClientResponse,
  ClientService,
  CreateClientServerParams, EditClientServerParams,
} from '@/core/services/client/client-service.interface';

class ClientServiceImpl extends Service implements ClientService {
  constructor(protected http: HttpClient) {
    super();
  }

  public async list(): Promise<HttpResponse<ClientResponse>> {
    return this.http.get<ClientResponse>(`${config.API_URL}clients`)
      .catch((e) => this.handleError(e));
  }

  public async detail(params: { id: number }): Promise<HttpResponse<ClientDetailResponse>> {
    return this.http.get<ClientDetailResponse>(`${config.API_URL}client/${params.id}`)
      .catch((e) => this.handleError(e));
  }

  public async create(params: CreateClientServerParams): Promise<HttpResponse<void>> {
    return this.http.get<void>(`${config.API_URL}client`, {
      params,
    }).catch((e) => this.handleError(e));
  }

  public async edit(id: number, params: EditClientServerParams): Promise<HttpResponse<void>> {
    return this.http.patch<void>(`${config.API_URL}client/${id}`, {
      params,
    }).catch((e) => this.handleError(e));
  }

}

export default new ClientServiceImpl(httpClient);
