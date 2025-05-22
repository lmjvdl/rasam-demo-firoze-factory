import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import concatImagePathAndBaseUrl from "@/utils/formatters/contcatImagePathAndBaseUrl";
import { ViewDialogProps } from "@/interfaces/admin/general";

const ViewDialog: React.FC<ViewDialogProps & { keyObjectValMap?: Map<number, string> }> = ({
  open,
  onClose,
  rowData,
  titles,
  booleanAttributeName,
  falseLabel = "خیر",
  trueLabel = "بله",
  arrayAttributes = {},
  objectAttributes = [],
  keyObjectValMap,
}) => {
  if (!rowData || typeof rowData !== "object") return null;

  const renderValue = (key: string, value: any) => {
    const column = titles.find(col => col.id === key);
    
    // Handle key-value objects (like datatype_operation)
    if (column?.isKeyValueObject && value && typeof value === "object" && keyObjectValMap) {
      return Object.entries(value)
        .map(([id, operation]) => {
          const label = keyObjectValMap.get(parseInt(id)) || id;
          return `${label}: (${operation})`;
        })
        .join(", ");
    }

    // Handle object attributes
    if (objectAttributes.includes(key) && value && typeof value === "object") {
      return value.name || value.id || "نامشخص";
    }

    // Handle boolean values
    if (booleanAttributeName === key) {
      return value ? trueLabel : falseLabel;
    }

    // Handle arrays
    if (Array.isArray(value)) {
      const attributeKey = arrayAttributes[key] || "name";
      return value
        .map((item) => {
          if (item && typeof item === "object") {
            return item[attributeKey] || "نامشخص";
          }
          return item;
        })
        .join(", ");
    }

    // Handle strings, numbers, etc.
    return value !== null && value !== undefined ? String(value) : "ندارد";
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>نمایش جزئیات</DialogTitle>
      <DialogContent dividers>
        {titles
          ?.filter((column) => !column.isActionColumn)
          .map((column) => {
            const value = rowData[column.id];

            return (
              <Typography
                key={column.id}
                variant="body2"
                color="text.primary"
                gutterBottom
                sx={{ display: "flex" }}
              >
                {column.isImage && value ? (
                  <>
                    <img
                      src={concatImagePathAndBaseUrl(value)}
                      alt=""
                      style={{
                        width: "36px",
                        height: "36px",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <strong style={{ minWidth: "200px", display: "inline-block" }}>
                      {column.label}:
                    </strong>
                    <span>{renderValue(column.id, value)}</span>
                  </>
                )}
              </Typography>
            );
          })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDialog;