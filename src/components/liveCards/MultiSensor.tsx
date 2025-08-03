import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  useTheme,
} from "@mui/material";
import OnOff from "./dependenciesLiveCards/OnOff";
import { MultiSensorLiveSchema } from "@/interfaces/lives/multiSensor";

interface Props {
  container: MultiSensorLiveSchema;
}

export default function MultiSensorLiveCard({ container }: Props) {
  const theme = useTheme();
  const safeData = container.data || {};

  return (
    <Box
      sx={{
        padding: 1,
        boxSizing: "border-box",
        margin: 1,
      }}
    >
      <Card
        sx={{
          boxShadow: 3,
          height: "100%",
          backgroundColor:
            container.online === "on"
              ? theme.palette.background.default
              : theme.palette.background.disable,
        }}
      >
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h6">{container.device_code}</Typography>
            <OnOff on={container.online} />
          </Box>

          <Box mt={2} display="flex" flexDirection="column" gap={2}>
            <Divider />

            {safeData.current !== undefined && (
              <Typography>جریان دستگاه: {`${safeData.current} A`}</Typography>
            )}
            
            {safeData.temperature !== undefined && (
              <Typography>دمای دستگاه: {`${safeData.temperature} C°`}</Typography>
            )}

            {safeData.soilSurface !== undefined && (
              <Typography>سطح خاک: {`${safeData.soilSurface} m`}</Typography>
            )}

            {safeData.WeightIncomingSoil !== undefined && (
              <Typography>وزن خاک ورودی: {`${safeData.WeightIncomingSoil} kg`}</Typography>
            )}

            {safeData.OutputSoilWeight !== undefined && (
              <Typography>وزن خروجی خاک: {`${safeData.OutputSoilWeight} kg`}</Typography>
            )}

            {safeData.BurnerTemperature !== undefined && (
              <Typography>دمای مشعل: {`${safeData.BurnerTemperature} °C`}</Typography>
            )}

            {safeData.OutletTemperature !== undefined && (
              <Typography>دمای خروجی: {`${safeData.OutletTemperature} °C`}</Typography>
            )}

            {safeData.OutputGranuleWeight !== undefined && (
              <Typography>وزن گرانول خروجی: {`${safeData.OutputGranuleWeight} kg`}</Typography>
            )}

            {safeData.OutputGranuleTemperature !== undefined && (
              <Typography>دمای گرانول خروجی: {`${safeData.OutputGranuleTemperature} °C`}</Typography>
            )}

            {safeData.OutputGranuleMoisture !== undefined && (
              <Typography>رطوبت گرانول خروجی: {`${safeData.OutputGranuleMoisture} %`}</Typography>
            )}

            {safeData.MonopumpCurrent !== undefined && (
              <Typography>جریان مونوپمپ: {`${safeData.MonopumpCurrent} A`}</Typography>
            )}

            {safeData.MonopumpTemprature !== undefined && (
              <Typography>دمای مونوپمپ: {`${safeData.MonopumpTemprature} °C`}</Typography>
            )}
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
}
