// @format
import { classToPlain } from 'class-transformer';
import { Type } from 'class-transformer/decorators';
import { Host } from './host';

export class PullZone {
  constructor(public name: string, public originUrl: string) {}

  id: number = -1;
  enabled: boolean = false;
  @Type(() => Host)
  hostNames: Host[] = [];
  storageZoneId: number = -1;
  allowedReferrers: string[] = [];
  blockedIps: string[] = [];
  enableGeoZoneUS: boolean = false;
  enableGeoZoneEU: boolean = false;
  zoneSecurityEnabled: boolean = false;
  zoneSecurityKey: string = '';
  zoneSecurityIncludeHashRemoteIP: boolean = false;
  ignoreQueryStrings: boolean = false;
  monthlyBandwidthLimit: number = -1;
  monthlyBandwidthUsed: number = -1;
  addHostHeader: boolean = false;
  zoneType: number = -1;
  accessControlOriginHeaderExtensions: string[] = [];
  enableAccessControlOriginHeader: boolean = false;
  disabledCookies: boolean = false;
  budgetRedirectedCountries: string[] = [];
  blockedCountries: string[] = [];
}
