//@format
import {Type} from 'class-transformer';
import {Host} from './host';

export class PullZone {
  constructor(public name: string, public originUrl: string) {}

  id: number;
  enabled: boolean;
  @Type(() => Host)
  hostNames: Host[];
  storageZoneId: number;
  allowedReferrers: string[];
  blockedIps: string[];
  enableGeoZoneUS: boolean;
  enableGeoZoneEU: boolean;
  zoneSecurityEnabled: boolean;
  zoneSecurityKey: string;
  zoneSecurityIncludeHashRemoteIP: boolean;
  ignoreQueryStrings: boolean;
  monthlyBandwidthLimit: number;
  monthlyBandwidthUsed: number;
  addHostHeader: boolean;
  //Enum?
  zoneType: number;
  accessControlOriginHeaderExtensions: string[];
  enableAccessControlOriginHeader: boolean;
  disabledCookies: boolean;
  budgetRedirectedCountries: string[];
  blockedCountries: string[];
}
