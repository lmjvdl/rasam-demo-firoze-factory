// user*	integer
// title: User
// exp_date*	string($date-time)
// title: Exp_date
// usage_rate*	string
// title: Usage_rate
// maxLength: 100
// minLength: 1
// example: 1/10/sec -> number_of_request/time/sec,min,hour,...

// source_ips*
export type SourceIps = `${string}/${string}/${string}`;
export type Ips = `${number}.${number}.${number}.${number}/${number}`;
export interface APIKeyForPost {
  user: number;
  exp_date: string;
  usage_rate: SourceIps;
  source_ips: { ips: string[] | Ips[] };
}
export type APIKeyResponse = APIKeyForPost & {
  refresh: string;
  id: number;
};
