// @format
import { AxiosResponse } from 'axios';
import { plainToClass, classToPlain } from 'class-transformer';
import { HttpBase } from './http-base.client';
import { Resource, Endpoint } from '../enums';
import { PullZone, Statistic, Billing } from '../models';

export class PullZoneClient extends HttpBase {
  constructor(httpClient?: any) {
    super(httpClient);
  }

  async get(pullZoneId?: number): Promise<PullZone | PullZone[]> {
    if (!pullZoneId) {
      const response: AxiosResponse = await super.fetch(Resource.PullZone);
      return plainToClass(PullZone, response.data);
    } else {
      const response: AxiosResponse = await super.fetch(
        `${Resource.PullZone}/${pullZoneId}`,
      );
      return plainToClass(PullZone, response.data);
    }
  }

  async create(pullzone: PullZone): Promise<void> {
    const body = classToPlain(pullzone);
    const result = await super.post(Resource.PullZone, body);
  }

  async update(id: number, pullzone: PullZone): Promise<void> {
    const body = classToPlain(pullzone);
    await super.post(`${Resource.PullZone}/${id}`, body);
  }

  async addHostname(pullZoneId: number, hostName: string): Promise<void> {
    const body = {
      pullZoneId,
      hostName,
    };
    await super.post(`${Resource.PullZone}/${Endpoint.AddHostName}`, body);
  }

  async setForceSSL(
    pullZoneId: number,
    hostName: string,
    forceSSL: boolean = true,
  ): Promise<void> {
    const body = {
      pullZoneId,
      hostName,
      forceSSL,
    };
    await super.post(`${Resource.PullZone}/${Endpoint.SetForceSSL}`, body);
  }

  async addCertificate(
    pullZoneId: number,
    hostName: string,
    certificate: string,
    certificateKey: string,
  ): Promise<void> {
    const body = {
      pullZoneId,
      hostName,
      certificate,
      certificateKey,
    };
    await super.post(`${Resource.PullZone}/${Endpoint.AddCertificate}`, body);
  }

  async addBlockedIP(pullZoneId: number, blockedIp: string): Promise<void> {
    const body = {
      pullZoneId,
      blockedIp,
    };
    await super.post(`${Resource.PullZone}/${Endpoint.AddBlockedIP}`, body);
  }

  async removeBlockedIP(pullZoneId: number, blockedIp: string): Promise<void> {
    const body = {
      pullZoneId,
      blockedIp,
    };
    await super.post(`${Resource.PullZone}/${Endpoint.RemoveBlockedIP}`, body);
  }

  async loadFreeCertificate(hostName: string): Promise<void> {
    await super.fetch(
      `${Resource.PullZone}/${
        Endpoint.LoadFreeCertificate
      }?hostname=${hostName}`,
    );
  }

  async deleteHostname(id: number, hostName: string): Promise<void> {
    await super.del(
      `${Resource.PullZone}/${
        Endpoint.DeleteHostName
      }?id=${id}&hostname=${hostName}`,
      undefined,
    );
  }

  async purge(pullZoneId: number): Promise<void> {
    await super.post(
      `${Resource.PullZone}/${pullZoneId}/${Endpoint.PurgeCache}`,
      null,
    );
  }
}
