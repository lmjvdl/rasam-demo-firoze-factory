import { BaalMillLiveSchema } from "@/interfaces/preparingBody/live";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Divider,
  useTheme,
} from "@mui/material";
import OnOff from "../OnOff";

export default function BaalMillCard(container: BaalMillLiveSchema) {
  const theme = useTheme();

  const safeContainer = container || {};
  const safeData = safeContainer.data || {
    current: 0,
    frequency: 0,
    dcVoltage: 0,
    acVoltage: 0,
    temperature: 0,
  };

  return (
    <Card
      sx={{ boxShadow: 3 }}
      style={{
        backgroundColor:
          safeContainer.online === "on"
            ? theme.palette.background.default
            : theme.palette.background.disable,
      }}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">{safeContainer.device_code}</Typography>
          <OnOff on={safeContainer.online} />
        </Box>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginBlockStart: "20px",
          }}>
          <Divider />
          <Typography>جریان دستگاه: {safeData.current} A</Typography>
          <Typography>فرکانس دستگاه: {safeData.frequency} HZ</Typography>
          <Typography>ولتاژ DC دستگاه: {safeData.dcVoltage} V</Typography>
          <Typography>ولتاژ AC دستگاه: {safeData.acVoltage} V</Typography>
          <Typography>دمای دستگاه: {safeData.temperature} C</Typography>
        </div>
      </CardContent>
    </Card>
  );
}
