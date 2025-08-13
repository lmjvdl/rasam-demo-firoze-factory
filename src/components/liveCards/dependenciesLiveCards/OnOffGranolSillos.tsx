import { Button, Typography } from "@mui/material";

interface Props {
  on: string;
  index: number; // Silo number
}

const OnOffGranuleSillos = ({ on, index }: Props) => {
  // Determine the general state based on the "on" string value
  const state =
    on === "on"
      ? "on"
      : on === "off"
      ? "off"
      : on === "disconnect"
      ? "disconnect"
      : "unknown";

  const isOn = state === "on";

  // Discharging occurs on even-numbered silos when they are "on"
  const isDischarging = isOn && index % 2 === 0;

  // Generate the label text based on state and index
  function recognizeState(): string {
    if (isOn) {
      return isDischarging ? "در حال تخلیه" : "در حال بارگیری";
    } else if (state === "off") {
      return "خاموش";
    } else if (state === "disconnect") {
      return "قطع ارتباط";
    } else {
      return "خاموش";
    }
  }

  return (
    <Button
      component={Typography}
      color={
        isOn
          ? isDischarging
            ? "warning"       // Red for discharging silos (even-indexed)
            : "primary"     // Blue for loading silos (odd-indexed)
          : state === "disconnect"
          ? "inherit"       // Yellow for disconnect
          : "error"       // Default color for "off" and "unknown"
      }
      disableFocusRipple
      disableTouchRipple
      disableRipple
      disableElevation
      variant="outlined"
    >
      {recognizeState()}
    </Button>
  );
};

export default OnOffGranuleSillos;
