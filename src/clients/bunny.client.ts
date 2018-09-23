//@format
import 'reflect-metadata';
import axios from 'axios';
import {PullZoneClient} from './pullzone.client';
import {HttpBase} from './http-base.client';
import {Statistic} from '../models/statistic';
import {Billing} from '../models/billing';
import {Resource} from '../config/resource.enum';
import {plainToClass} from 'class-transformer';

const config = {
  baseURL: 'https://bunnycdn.com/api/',
};

export class Bunny extends HttpBase {
  private _pullZoneClient: PullZoneClient;
  public get pullZone(): PullZoneClient {
    return this._pullZoneClient;
  }

  constructor(httpClient?: any) {
    super(httpClient || axios, config);
    this._pullZoneClient = new PullZoneClient(config, httpClient || axios);
  }

  statistics(): Promise<Statistic[]> {
    return super.fetch(`${Resource.Statistic}`).then(response => plainToClass(Statistic, response.data));
  }

  billing(): Promise<Billing[]> {
    return super.fetch(`${Resource.Billing}`).then(response => plainToClass(Billing, response.data));
  }

  applyCode(couponCode: string): Promise<Billing> {
    return super.fetch(`${Resource.Billing}/applyCode?couponCode=${couponCode}`);
  }

  purge(url: string): Promise<void> {
    return super.post(`${Resource.PullZone}/purge?url=${url}`, null);
  }
}
