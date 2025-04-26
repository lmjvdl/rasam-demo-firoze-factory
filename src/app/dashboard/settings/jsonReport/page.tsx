import { Container, Typography, CircularProgress, Alert, Box } from "@mui/material";
import useJsonReport from "./useJsonReport";
import Form from "@/components/form/form";
import { getFormFields } from "./fields";


export default function JsonReport() {
  const { downloadReport, isLoading, error } = useJsonReport();

  const handleSearch = async (filters: any) => {
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
      <Typography variant="h4" gutterBottom>
        گزارش JSON دستگاه‌ها
      </Typography>

      <Form
        formFields={getFormFields()}
        onSubmit={handleSearch}
        fixedValues={{}} buttonText={"دانلود گزارش"} />

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


