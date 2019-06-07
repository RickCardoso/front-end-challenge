import { HttpClientAxiosImpl } from '@/core/http/http-client-axios-impl';
import { HttpClient } from '@/core/http/http-client.interface';
export * from './http-client.interface';
const axiosClient: HttpClient = new HttpClientAxiosImpl();

export default axiosClient;
