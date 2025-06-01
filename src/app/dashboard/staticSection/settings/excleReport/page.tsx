import { Container, CircularProgress, Alert, Box } from "@mui/material";
import Form from "@/components/form/form";
import useExcelReport from "./useExcleReport";
import { getFormFields } from "../shared/fields";


export default function ExcelReport() {
  const { downloadReport, isLoading, error } = useExcelReport();

  const handleOperation = async (filters: any) => {
    try {
      await downloadReport(filters);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : "خطایی رخ داده است" 
      };
    }
  };

  return (
    <Container sx={{ minWidth: "100%", overflowY: "auto", py: 3 }}>
      <Form
        formFields={getFormFields()}
        onSubmit={handleOperation}
        fixedValues={{}} 
        buttonText={"دانلود گزارش"} />

      {isLoading && (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
}


