import { Button, Divider, Stack, SxProps, Typography } from "@mui/material";
import OnOff from "./OnOff";
import KeyValInfo from "./KeyValInfo";

const Balmil = ({ on, sx }: { on?: boolean; sx?: SxProps }) => {
  return (
    <Stack
      sx={{
        p: 4,
        boxShadow: "0 0 10px 4px var(--mui-palette-background-disable)",
        borderRadius: 1,
        gap: 2,
        ...sx,
      }}
    >
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography>بالمیل </Typography>
        <OnOff on={!!on} />
        {/* <OnOff on={false} /> */}
      </Stack>
      <Divider />
      <Button>اطلاعات بالمیل</Button>
      <KeyValInfo />
    </Stack>
  );
};

export default Balmil;
