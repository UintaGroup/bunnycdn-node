// @format
import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { HttpBase } from './http-base.client';
import { Resource, ClientType } from '../enums';
import { Statistic, Billing, StorageZoneFile } from '../models';

export class StorageClient extends HttpBase {
  constructor(httpClient?: any) {
    super(httpClient, ClientType.Storage);
  }

  async get(storageZone: string): Promise<StorageZoneFile | StorageZoneFile[]> {
    const response: AxiosResponse = await super.fetch(`${storageZone}/`);
    return plainToClass(StorageZoneFile, response.data);
  }

  async getFile(filePath: string): Promise<string> {
    const response: AxiosResponse = await super.fetch(filePath);
    return response.data;
  }

  async update(filePath: string, fileContents: string): Promise<string> {
    const response: AxiosResponse = await super.put(filePath, fileContents, {
      header: { 'Content-Type': 'text/plain' },
    });
    return response.data;
  }

  async delete(filePath: string): Promise<string> {
    const response: AxiosResponse = await super.del(filePath);
    return response.data;
  }
}
