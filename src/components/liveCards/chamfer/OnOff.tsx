import { Button, Typography } from "@mui/material";

const OnOff = ({ text = "خاموش", on }: { text?: string; on?: boolean }) => {
  return (
    <Button
      component={Typography}
      disableFocusRipple
      disableTouchRipple
      disableRipple
      disableElevation
      variant="outlined"
      disabled={!on}
    >
      {text}
    </Button>
  );
};

export default OnOff;
