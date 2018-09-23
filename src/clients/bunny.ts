import { HttpBase } from './http-base';

const config = {
    baseURL: 'https://bunnycdn.com/api/'
};
export class Bunny extends HttpBase {

    constructor() {
        super(config);
    }


    pullzones(): Promise<any> {
        return super.get('pullzone');
    }

}
