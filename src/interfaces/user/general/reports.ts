export interface ReportDetail {
    id: number;
    name: string;
}
  
export interface ReportDetailResponse {
    data: ReportDetail[];  
    report_id: string;
}