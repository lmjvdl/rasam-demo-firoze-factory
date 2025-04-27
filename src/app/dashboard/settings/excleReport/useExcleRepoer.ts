import { ReportParams } from "@/interfaces/settings/downloadFile";
import { validateDateRange } from "@/utils/checker/validateDateRange";
import { fetchWithErrorForDownload } from "@/utils/dataFetching/fetchWithError";
import gregorianToJalali from "@/utils/formatters/isoDateToSolarDate";
import unixToIso from "@/utils/formatters/unixToIso";
import downloadFileUrls from "@/utils/url/userPanel/settings/downloadFile";
import { useState } from "react";
import toast from "react-hot-toast";

const useExcelReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadReport = async (params: ReportParams) => {
    setIsLoading(true);
    setError(null);
    if (!validateDateRange(params.start_time.unix, params.end_time.unix)) {
      setIsLoading(false);
      return;
    }
    try {
      await fetchWithErrorForDownload(
        `${downloadFileUrls.excelDownload}`,
        {
          devices: params.devices.join(", "),
          start_time: unixToIso(params.start_time.unix),
          end_time: unixToIso(params.end_time.unix),
        },
        `گزارش اکسل از ${gregorianToJalali(unixToIso(params.start_time.unix))} تا ${gregorianToJalali(unixToIso(params.end_time.unix))}`
      );
    } catch {
      toast.error('خطا در دانلود فایل');
    } finally {
      setIsLoading(false);
    }
  };

  return { downloadReport, isLoading, error };
};

export default useExcelReport;
