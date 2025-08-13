import { Button, Typography } from "@mui/material";

interface Props {
  on: string;
}

const OnOffGranuleSillos = ({ on }: Props) => {
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

  // Generate the label text based on state and index
  function recognizeState(): string {
    if (isOn) {
      return "در حال بارگیری";
    } else if (state === "off") {
      return "در حال تخلیه";
    } else if (state === "disconnect") {
      return "قطع ارتباط";
    } else {
      return "غیرفعال";
    }
  }

  return (
    <Button
      component={Typography}
      color={
        state === "on" ? "primary" :    // Blue for loading silos (odd-indexed)
          state === "disconnect"
            ? "inherit" :
            state === "off" ? "error"    // Yellow for disconnect
              : "warning"       // Default color for "off" and "unknown"
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
