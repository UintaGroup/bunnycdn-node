// @format
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import axios, { AxiosResponse } from 'axios';
import { HttpBase, PullZoneClient, StorageClient } from './clients';
import { Billing, Statistic } from './models';
import { Resource, Endpoint, Parameter } from './enums';

export class Bunny extends HttpBase {
  private _pullZoneClient: PullZoneClient;
  public get pullZone(): PullZoneClient {
    return this._pullZoneClient;
  }

  private _storageClient: StorageClient;
  public get storage(): StorageClient {
    return this._storageClient;
  }

  constructor(httpClient?: any) {
    super(httpClient || axios);
    this._pullZoneClient = new PullZoneClient(httpClient || axios);
    this._storageClient = new StorageClient(httpClient || axios);
  }

  async statistics(): Promise<Statistic[]> {
    const response: AxiosResponse = await super.fetch(Resource.Statistic);
    return plainToClass(Statistic, response.data);
  }

  async billing(): Promise<Billing[]> {
    const response: AxiosResponse = await super.fetch(Resource.Billing);
    return plainToClass(Billing, response.data);
  }

  async applyCode(couponCode: string): Promise<void> {
    await super.fetch(
      `${Resource.Billing}/${Endpoint.ApplyCode}?${
        Parameter.CouponCode
      }=${couponCode}`,
    );
  }

  async purge(url: string): Promise<void> {
    await super.post(`${Endpoint.Purge}?${Parameter.URL}=${url}`, null);
  }

  async hardUpdate(
    host: string,
    storageZone: string,
    path: string,
    fileName: string,
    fileContents: string,
  ): Promise<void> {
    await this.storage.update(
      `${storageZone}/${path}/${fileName}`,
      fileContents,
    );
    await this.purge(`${host}/${path}/${fileName}`);
  }
}
