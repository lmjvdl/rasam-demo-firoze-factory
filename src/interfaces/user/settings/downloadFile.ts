import { DateObject } from "react-multi-date-picker";

export interface ReportParams {
    devices: string[];
    start_time: DateObject;
    end_time: DateObject;
}