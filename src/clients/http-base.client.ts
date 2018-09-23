//@format
const API_KEY = process.env['API_KEY'];

export class HttpBase {
  private _baseConfig = {
    headers: {AccessKey: API_KEY},
  };

  constructor(private client: any, config: object) {
    this._baseConfig = {...config, ...this._baseConfig};
  }

  fetch(url: string, config?: object): Promise<any> {
    return this.client.get(url, {...this._baseConfig, ...config});
  }

  post(url: string, body: object, config?: object): Promise<any> {
    return this.client.post(url, body, {...this._baseConfig, ...config});
  }

  del(url: string, config?: object): Promise<any> {
    return this.client.delete(url, {...this._baseConfig, ...config});
  }
}
