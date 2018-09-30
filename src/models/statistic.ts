// @format
import { OccuranceByDate } from './occurance-by-date';

export class Statistic {
  totalBandwidthUsed: number = -1;
  totalRequestsServed: number = -1;
  cacheHitRate: number = -1;
  bandwidthUsedChart?: OccuranceByDate;
  bandwidthCachedChart?: OccuranceByDate;
  cacheHitRateChart?: OccuranceByDate;
  requestsServedChart?: OccuranceByDate;
  pullRequestsPulledChart?: OccuranceByDate;
  userBalanceHistoryChart?: OccuranceByDate;
  userStorageUsedChart?: OccuranceByDate;
  geoTrafficDistribution?: object;
  error3xxChart?: OccuranceByDate;
  error4xxChart?: OccuranceByDate;
  error5xxChart?: OccuranceByDate;
}
