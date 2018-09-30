// @format
import { AxiosResponse } from 'axios';
import { ClientType } from '../enums/client-type.enum';
import { Domain } from '../enums';

const BUNNY_API_KEY = process.env['BUNNY_API_KEY'] || '';
const BUNNY_STORAGE_API_KEY = process.env['BUNNY_STORAGE_API_KEY'] || '';

export abstract class HttpBase {
  private _baseConfig = {
    headers: {
      AccessKey:
        this.clientType === ClientType.Storage
          ? BUNNY_STORAGE_API_KEY
          : BUNNY_API_KEY,
    },
    baseURL:
      this.clientType === ClientType.Storage ? Domain.Storage : Domain.API,
  };

  constructor(
    private httpClient: any,
    private clientType: ClientType = ClientType.API,
  ) {}

  fetch(url: string, config?: object): Promise<AxiosResponse> {
    return this.httpClient.get(url, { ...this._baseConfig, ...config });
  }

  post(url: string, body: any, config?: object): Promise<AxiosResponse> {
    return this.httpClient.post(url, body, { ...this._baseConfig, ...config });
  }

  put(url: string, body: any, config?: object): Promise<AxiosResponse> {
    return this.httpClient.put(url, body, { ...this._baseConfig, ...config });
  }

  del(url: string, config?: object): Promise<AxiosResponse> {
    return this.httpClient.delete(url, { ...this._baseConfig, ...config });
  }
}
