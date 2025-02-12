import { PackagingLiveCard } from "@/components/packagingLive/packagingLiveCard";
import MainCard from "@/components/CustomContiner/MainCard";
import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const page = () => {
  return (
    <MainCard sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Paper sx={{ width: "100%", flexGrow: 1 }} elevation={3}></Paper>
      <Paper
        sx={{ width: "100%", flexGrow: 1, p: 2, display: "flex" }}
        elevation={3}
      >
        <Stack gap={1}>
          <PackagingLiveCard
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
          <PackagingLiveCard
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
        </Stack>
      </Paper>
    </MainCard>
  );
};

export default page;

