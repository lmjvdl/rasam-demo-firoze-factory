export interface ReportDetail {
    id: number;
    name: string;
}
  
export interface ReportDetailResponse {
    data: ReportDetail[];
    status_code: number;
    success: boolean;
    messages: string;
}