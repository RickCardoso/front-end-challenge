import { HttpResponse } from '@/core/http/http-client.interface';

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  firstName: string;
}

export interface LoginService {
  login(params: LoginParams): Promise<HttpResponse<LoginResponse>>;
}
