import { Divider, SxProps, Stack, Typography } from "@mui/material";
import { Fragment, ReactNode } from "react";
export const T = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <Typography variant="caption">{children}</Typography>;
};
export const T2 = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <Typography
      sx={{ flexGrow: 1, textAlign: "end" }}
      align="left"
      variant="caption"
    >
      {children}
    </Typography>
  );
};

export const KeyValBox = ({
  keyValList = [
    { key: "تعداد کاشی تولیدی :", value: "1234" },
    { key: "درصد کاشی تولیدی :", value: "۴۸٪" },
  ],
  header,
  footer,
  sxContainer,
  sxKeyValContainer,
  sxDivider,
  KeyNode = T,
  ValNode = T2,
  enableFirstDivider = true,
  enableLastDivider = false,
  enableDivider = true,
}: {
  keyValList?: Array<{ key: string | ReactNode; value: string | ReactNode }>;
  header?: ReactNode;
  footer?: ReactNode;
  sxContainer?: SxProps;
  sxKeyValContainer?: SxProps;
  sxDivider?: SxProps;
  enableFirstDivider?: boolean;
  enableLastDivider?: boolean;
  enableDivider?: boolean;
  KeyNode?: ({
    children,
  }: Readonly<{
    children: ReactNode;
  }>) => React.JSX.Element;
  ValNode?: ({
    children,
  }: Readonly<{
    children: ReactNode;
  }>) => React.JSX.Element;
}) => {
  const DividerComp = <Divider sx={{ ...sxDivider }} variant="middle" />;
  return (
    <Stack
      bgcolor={"secondary.main"}
      sx={{
        p: 1,
        gap: 0.5,
        width: "fit-content",
        height: "fit-content",
        ...sxContainer,
      }}
    >
      {header}
      {enableFirstDivider && DividerComp}
      {keyValList.map((item, index) => {
        return (
          <Fragment key={String(item.key)}>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                ...sxKeyValContainer,
              }}
              gap={1}
            >
              {KeyNode ? <KeyNode>{item.key}</KeyNode> : item.key}
              {ValNode ? <ValNode>{item.value}</ValNode> : item.value}
            </Stack>
            {enableDivider
              ? enableLastDivider
                ? DividerComp
                : keyValList.length - 1 !== index && DividerComp
              : null}
          </Fragment>
        );
      })}
      {footer}
    </Stack>
  );
};
