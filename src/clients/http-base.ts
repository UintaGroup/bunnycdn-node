import axios from 'axios';

const API_KEY = process.env['API_KEY']

export class HttpBase {

    private _baseConfig = {
        headers: {'AccessKey': API_KEY},
    };

    constructor(config: object) {
        this._baseConfig = {...config, ...this._baseConfig};
    }

    get(url: string, config?: object): Promise<any> {
        return axios.get(url, {...this._baseConfig, ...config});
    }
}
