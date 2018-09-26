//@format
import {HttpBase} from './http-base.client';
import {plainToClass, classToPlain} from 'class-transformer';
import {Resource} from '../config/resource.enum';
import {PullZone} from '../models/pullzone';
import {Statistic} from '../models/statistic';
import {Billing} from '../models/billing';

export class PullZoneClient extends HttpBase {
  constructor(config: object, httpClient?: any) {
    super(httpClient, config);
  }

  get(pullZoneId?: number): Promise<PullZone | PullZone[]> {
    if (!pullZoneId) {
      return super.fetch(Resource.PullZone).then(response => plainToClass(PullZone, response.data));
    } else {
      return super.fetch(`${Resource.PullZone}/${pullZoneId}`).then(response => plainToClass(PullZone, response.data));
    }
  }

  create(pullzone: PullZone): Promise<void> {
    const body = classToPlain(pullzone);
    return super.post(Resource.PullZone, body);
  }

  update(id: number, pullzone: PullZone): Promise<void> {
    const body = classToPlain(pullzone);
    return super.post(`${Resource.PullZone}/${id}`, body);
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
