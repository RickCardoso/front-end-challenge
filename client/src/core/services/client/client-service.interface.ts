import { HttpResponse } from '@/core/http/http-client.interface';

export interface ClientResponse {
  clients: ClientListItem[];
}

export interface ClientDetailResponse {
  client: Client;
}

export interface ClientListItem {
  id: number;
  name: string;
  status: number;
}

export interface Client {
  id?: number;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  status: number | string;
  document: {
    type: number | string;
    number: string;
  };
  partners: Array<{
    name: string;
    document: string;
  }>;
}

export interface CreateClientServerParams extends Client {
}

export interface EditClientServerParams extends Partial<Client> {
}

export interface ClientService {
  list(): Promise<HttpResponse<ClientResponse>>;
}
