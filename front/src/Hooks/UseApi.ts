import axios from 'axios';
import { AuthApi } from './AuthApi/AuthApi';
import { ClientApi } from './Client/Client';
import { CleintPostApi } from './ClientPostApi/ClientPostApi';
import { PostApi } from './PostApi/PostApi';
import { QRCodeApi } from './QRCodeApi/QRCodeApi';



export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})





export class UseApi {

  // Opçãoes de requisições para a rota de login
  authApi = AuthApi;
  postApi =PostApi;
  clientApi = ClientApi
  clientPostApi = CleintPostApi;
  qrCodeApi = QRCodeApi;


}