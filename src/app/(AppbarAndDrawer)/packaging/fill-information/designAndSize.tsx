import { Grid, Typography } from "@mui/material";

interface DesignAndSizeProps {
  design: string;
  aspect_ratio: string;
}

export default function DesignAndSize({ design, aspect_ratio }: DesignAndSizeProps) {
  const textStyle = { display: "inline-block", fontSize: "20px" };
  const highlightStyle = {
    color: "var(--mui-palette-primary-main)",
    display: "inline-block",
    fontWeight: "bold",
    fontSize: "28px",
    paddingLeft: "10px",
  };

  return (
    <Grid item xs={12}>
      <Typography sx={textStyle}>طرح</Typography>
      <Typography sx={highlightStyle}>{design}</Typography>
      <Typography sx={{ display: "inline-block", paddingInline: "20px", fontSize: "30px" }}>
        -
      </Typography>
      <Typography sx={textStyle}>سایز</Typography>
      <Typography sx={highlightStyle}>{aspect_ratio}</Typography>
    </Grid>
  );
}
