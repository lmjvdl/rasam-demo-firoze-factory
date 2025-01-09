import { Box, Stack, Typography } from "@mui/material";

const KeyValInfo = ({
  data = { "جریان دستگاه": "122 A", " فرکانس دستگاه": "2400 hz" },
  gap = 2,
}: {
  data?: object;
  gap?: number|object;
}) => {
  return (
    <Stack sx={{ gap: 2, maxHeight: 300, overflow: "clip", overflowY: "auto" }}>
      {[
        ...Object.entries(data),
        ...Object.entries(data),
        ...Object.entries(data),
      ].map(([k, v], index) => {
        return (
          <Stack
            key={index}
            sx={{ flexDirection: "row", width: "100%", gap: 1 }}
          >
            <Box
              sx={{ fontWeight: "thin", display: "flex", gap: 1 }}
              className="font-thin flex gap-1"
            >
              <Typography>{k}</Typography>:<Typography>{v}</Typography>
            </Box>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default KeyValInfo;
