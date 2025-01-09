import { Button } from "@mui/material";

const OnOff = ({ on }: { on?: boolean }) => {
  return (
    <Button
      variant="outlined"
      component="p"
      disabled={!on}
      className="cursor-auto"
    >
      {on ? "روشن" : "خاموش"}
    </Button>
  );
};

export default OnOff;
