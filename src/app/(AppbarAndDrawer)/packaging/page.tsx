import { KeyValBox } from "@/components/Boxes/KeyValBox";
import MainCard from "@/components/CustomContiner/MainCard";
import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <MainCard sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Paper
           sx={{ width: "100%", flexGrow: 1, p: 2, display: "flex",gap:2 }}
           elevation={3}
      >
      <Stack gap={1}>
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
            <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
        </Stack>
        <Stack gap={1}>
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
            <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
        </Stack>
        <Stack gap={1}>
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
            <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
        </Stack>
        <Stack gap={1}>
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
            <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
        </Stack>

      </Paper>
      <Paper
        sx={{ width: "100%", flexGrow: 1, p: 2, display: "flex",gap:2 }}
        elevation={3}
      >
        <Stack gap={1}>
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
            <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
        </Stack>
        <Stack gap={1}>
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
            <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
        </Stack>
        <Stack gap={1}>
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
            <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
        </Stack>
        <Stack gap={1}>
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
          <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
            <KeyValBox
            sxKeyValContainer={{ width: 300 }}
            header={<Typography fontWeight={500}>درجه ۴</Typography>}
          />
        </Stack>
      </Paper>
    </MainCard>
  );
};

export default page;
