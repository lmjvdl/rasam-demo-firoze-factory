import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  useTheme,
  Paper,
} from "@mui/material";
import OnOff from "./dependenciesLiveCards/OnOff";
import { MultiSensorLiveSchema } from "@/interfaces/lives/multiSensor";
import OnOffGranuleSillos from "./dependenciesLiveCards/OnOffGranolSillos";

interface Props {
  container: MultiSensorLiveSchema;
}

export default function MultiSensorLiveCard({ container }: Props) {
  const theme = useTheme();
  const safeData = container.data || {};

  function hasAttribute(attr: string): boolean {
    return attr in safeData;
  }

  function getSiloNumber(code: string): number | null {
    const match = code.match(/^سیلو (\d{1,2})$/);
    return match ? parseInt(match[1], 10) : null;
  }

  function renderAttribute<K extends keyof typeof safeData>(
    label: string,
    attr: K,
    unit: string = ""
  ): React.ReactNode {


    return (
      hasAttribute(attr) && (
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 1,
          }}
        >
          <Typography variant="body2" color="text.primary">
            {label}
          </Typography>
          {safeData[attr] !== undefined && (
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
            >
              {`${safeData[attr]}${unit}`}
            </Typography>
          )}
        </Paper>
      )
    );
  }

  const siloNumber = getSiloNumber(container.device_code);
  return (
    <Box sx={{ padding: 1, boxSizing: "border-box", margin: 1 }}>
      <Card
        sx={{
          boxShadow: 4,
          height: "100%",
          borderRadius: 3,
          backgroundColor:
            container.online === "on"
              ? theme.palette.background.default
              : theme.palette.action.disabledBackground,
          transition: "background-color 0.3s ease",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              {container.device_code}
            </Typography>

            {siloNumber && siloNumber >= 1 && siloNumber <= 12 ? (
              <OnOffGranuleSillos on={container.online} index={siloNumber} />
            ) : (
              <OnOff on={container.online} />
            )}
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box display="flex" flexDirection="column" gap={1}>
            {renderAttribute("جریان دستگاه", "current", " A")}
            {renderAttribute("دمای دستگاه", "temperature", " C°")}
            {renderAttribute("سطح خاک", "soilSurface", " m")}
            {renderAttribute("وزن خاک ورودی", "WeightIncomingSoil", " kg")}
            {renderAttribute("وزن آب ورودی", "OutputSoilWeight", " kg")}
            {renderAttribute("دمای مشعل", "BurnerTemperature", " C°")}
            {renderAttribute("دمای خروجی", "OutletTemperature", " C°")}
            {renderAttribute("وزن گرانول خروجی", "OutputGranuleWeight", " kg")}
            {renderAttribute("دمای گرانول خروجی", "OutputGranuleTemperature", " C°")}
            {renderAttribute("رطوبت گرانول خروجی", "OutputGranuleMoisture", " %")}
            {renderAttribute("جریان مونوپمپ", "MonopumpCurrent", " A")}
            {renderAttribute("دمای مونوپمپ", "MonopumpTemprature", " C°")}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
