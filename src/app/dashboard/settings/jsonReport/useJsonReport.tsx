import { ReportParams } from "@/interfaces/settings/downloadFile";
import { fetchWithErrorForDownload } from "@/utils/dataFetching/fetchWithError";
import downloadFileUrls from "@/utils/url/userPanel/settings/downloadFile";
import { useState } from "react";

const useJsonReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadReport = async (params: ReportParams) => {
    setIsLoading(true);
    setError(null);

    try {
      await fetchWithErrorForDownload(
        `${downloadFileUrls.jsonDownload}`,
        {
          devices: params.devices,
          date: params.date,
        },
        'report.json'
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در دریافت گزارش');
    } finally {
      setIsLoading(false);
    }
  };

  return { downloadReport, isLoading, error };
};

export default useJsonReport;
