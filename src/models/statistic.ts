//@format
import {OccuranceByDate} from './occurance-by-date';

export class Statistic {
  totalBandwidthUsed: number;
  totalRequestsServed: number;
  cacheHitRate: number;
  bandwidthUsedChart: OccuranceByDate;
  bandwidthCachedChart: OccuranceByDate;
  cacheHitRateChart: OccuranceByDate;
  requestsServedChart: OccuranceByDate;
  pullRequestsPulledChart: OccuranceByDate;
  userBalanceHistoryChart: OccuranceByDate;
  userStorageUsedChart: OccuranceByDate;
  geoTrafficDistribution: object;
  error3xxChart: OccuranceByDate;
  error4xxChart: OccuranceByDate;
  error5xxChart: OccuranceByDate;
}
