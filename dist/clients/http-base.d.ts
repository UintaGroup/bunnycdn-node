export declare class HttpBase {
    private _baseConfig;
    constructor(config: object);
    get(url: string, config?: object): Promise<any>;
}
