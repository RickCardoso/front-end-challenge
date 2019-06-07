import httpClient from '@/core/http';
import config from '@/core/config';
import { LoginParams, LoginResponse, LoginService } from './login-service.interface';
import { Service } from '@/core/services/services.interface';
import { HttpClient, HttpResponse } from '@/core/http/http-client.interface';

class LoginServiceImpl extends Service implements LoginService {
  constructor(protected http: HttpClient) {
    super();
  }

  public async login(params: LoginParams): Promise<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(`${config.API_URL}user/login`, {
      params,
    }).catch((e) => this.handleError(e));
  }

}

export default new LoginServiceImpl(httpClient);
