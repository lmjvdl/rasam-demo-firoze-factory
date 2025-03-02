import {
  ArrowDownward,
  ArrowUpward,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

const OrderingParam = ({
  params,
  setParams,
  paramName,
  paramValue,
  onChangeAfterSetParam,
}: {
  setParams: Dispatch<SetStateAction<any>>;
  paramName: string;
  paramValue: any;
  params?: any;
  
  onChangeAfterSetParam?: () => void;
}) => {
  const handleAscClick = () => {
    if (
      params.paramName === undefined ||
      String(params?.paramName).includes("-")
    ) {
      setParams((pre: any) => {
        return { ...pre, paramName: paramValue };
      });
    } else {
      setParams((pre: any) => {
        return { ...pre, paramName: undefined };
      });
    }
  };
  const handleDescClick = () => {
    if (
      params.paramName === undefined ||
      !String(params?.paramName).includes("-")
    ) {
      setParams((pre: any) => {
        return { ...pre, paramName: "-" + paramValue };
      });
    } else {
      setParams((pre: any) => {
        return { ...pre, paramName: undefined };
      });
    }
  };
  return (
    <Stack width={20}>
      <IconButton onClick={handleAscClick} sx={{ p: 0, m: 0, fontSize: 18 }}>
        <ExpandLess
          fontSize="inherit"
          color={
            params?.paramName && !String(params?.paramName).includes("-")
              ? "info"
              : "disabled"
          }
        />
      </IconButton>
      <IconButton
        onClick={handleDescClick}
        sx={{ p: 0, m: 0, fontSize: 18, mt: -0.5 }}
      >
        <ExpandMore
          fontSize="inherit"
          color={String(params?.paramName).includes("-") ? "info" : "disabled"}
        />
      </IconButton>
    </Stack>
  );
};

export default OrderingParam;
