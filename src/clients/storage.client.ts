//@format
import {HttpBase} from './http-base.client';
import {plainToClass, classToPlain} from 'class-transformer';
import {Resource} from '../config/resource.enum';
import {PullZone} from '../models/pullzone';
import {Statistic} from '../models/statistic';
import {Billing} from '../models/billing';

const config = {
  baseURL: 'https://storage.bunnycdn.com/',
};

export class StorageClient extends HttpBase {
  constructor(httpClient?: any) {
    super(httpClient, config);
  }

  get(storageZone: string, path: string): Promise<PullZone | PullZone[]> {
    return super.fetch(`${storageZone}/${path}`).then(response => plainToClass(PullZone, response.data));
  }

  update(storageZone: string, path: string, fileContents: string): Promise<void> {
    //TODO this doesn't provide much utility as is
    return super.post(`${storageZone}/${path}`, fileContents);
  }

  addHostname(pullZoneId: number, hostName: string): Promise<void> {
    const body = {
      pullZoneId,
      hostName,
    };
    return super.post(`${Resource.PullZone}/addHostname`, body);
  }

  setForceSSL(pullZoneId: number, hostName: string, forceSSL: boolean = true): Promise<void> {
    const body = {
      pullZoneId,
      hostName,
      forceSSL,
    };
    return super.post(`${Resource.PullZone}/setforcessl`, body);
  }

  addCertificate(pullZoneId: number, hostName: string, certificate: string, certificateKey: string): Promise<void> {
    const body = {
      pullZoneId,
      hostName,
      certificate,
      certificateKey,
    };
    return super.post(`${Resource.PullZone}/addcertificate`, body);
  }

  addBlockedIP(pullZoneId: number, blockedIp: string): Promise<void> {
    const body = {
      pullZoneId,
      blockedIp,
    };
    return super.post(`${Resource.PullZone}/addblockedip`, body);
  }

  removeBlockedIP(pullZoneId: number, blockedIp: string): Promise<void> {
    const body = {
      pullZoneId,
      blockedIp,
    };
    return super.post(`${Resource.PullZone}/removeblockedip`, body);
  }

  loadFreeCertificate(hostName: string): Promise<void> {
    return super.fetch(`${Resource.PullZone}/loadfreecertificate?hostname=${hostName}`);
  }

  deleteHostname(id: number, hostName: string): Promise<void> {
    return super.del(`${Resource.PullZone}/deleteHostname?id=${id}&hostname=${hostName}`, null);
  }

  purge(pullZoneId: number): Promise<void> {
    return super.post(`${Resource.PullZone}/${pullZoneId}/purgeCache`, null);
  }
}
