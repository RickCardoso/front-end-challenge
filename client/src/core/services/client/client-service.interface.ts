import { HttpResponse } from '@/core/http/http-client.interface';

export interface ClientResponse {
  clients: Client[];
}

export interface Client {
  id: number;
  name: string;
  status: number;
}

export interface CreateClientServerParams {
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  status: number | string;
  document: {
    type: number | string;
    number: string;
  };
  partners: {
    name: string;
    document: string;
  }[];
}

export interface ClientService {
  list(): Promise<HttpResponse<ClientResponse>>;
}
