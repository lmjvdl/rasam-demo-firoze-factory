"use client";

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
import { DeleteDialogProps } from "@/interfaces/admin/general";

/**
 * Utility function to render a key-value object.
 * Converts each key-value pair into a string format "key(value)", and joins them with commas.
 * 
 * @param {Record<string, any>} obj - The object containing key-value pairs to render.
 * @returns {string} - A string representation of key-value pairs.
 */
const renderKeyValueObject = (obj: Record<string, any>): string => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}(${value})`)
    .join(", ");
};

/**
 * Utility function to render simple object values.
 * It checks if the object is a string, number, or contains specific fields like `name`, `id`, `label`, or `value`.
 * 
 * @param {any} obj - The object to render.
 * @returns {string} - The rendered value of the object.
 */
const renderObjectValue = (obj: any) => {
  if (!obj) return "--";
  if (typeof obj === "string" || typeof obj === "number") return obj;
  if (obj.name) return obj.name;
  if (obj.id) return `#${obj.id}`;
  if (obj.label) return obj.label;
  if (obj.value) return obj.value;
  return JSON.stringify(obj);
};

/**
 * Utility function to render array values.
 * If the array is empty or undefined, a default message "No items available" is displayed.
 * Otherwise, it maps through the array and renders each item.
 * 
 * @param {any[]} array - The array to render.
 * @param {string} attributeKey - The attribute key to handle special cases for arrays.
 * @returns {string} - The rendered string representation of the array items.
 */
const renderArrayValue = (array: any[], attributeKey: string) => {
  if (!array || array.length === 0) return "هیچ موردی وجود ندارد"; // "No items available" in Persian
  return array.map((item) => renderObjectValue(item)).join(", ");
};

/**
 * Function to render a value based on its type.
 * Handles boolean, object, array, and primitive values (string, number, etc.).
 * 
 * @param {string} key - The key of the column.
 * @param {any} value - The value to render.
 * @param {any} column - The column configuration object.
 * @returns {string} - The rendered value based on its type.
 */
const renderValue = (key: string, value: any, column: any): string => {
  if (value === null || value === undefined) return "--";
  if (typeof value === "boolean") return value ? "فعال" : "غیرفعال"; // "Active" / "Inactive" in Persian
  if (Array.isArray(value)) return renderArrayValue(value, column.arrayAttributes[key]);

  if (typeof value === "object") {
    if (column.isKeyValueObject) return renderKeyValueObject(value);
    return renderObjectValue(value);
  }

  return value;
};

/**
 * DeleteDialog Component
 *
 * This component is a dialog that asks the user to confirm the deletion of a record.
 * It displays the details of the record to be deleted and allows the user to confirm or cancel the deletion.
 * 
 * Props:
 * @param {boolean} open - A boolean to control the visibility of the dialog.
 * @param {Function} onClose - A function that is called to close the dialog.
 * @param {Function} onConfirm - A function that is called when the delete action is confirmed.
 * @param {Object} rowData - The data of the record to be deleted.
 * @param {Array} titles - The columns to display in the dialog.
 * @param {Object} [arrayAttributes] - Optional attributes to manage how arrays and specific data types should be rendered.
 */
const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  rowData,
  titles,
}) => {
  // If there is no row data, do not render the dialog.
  if (!rowData) return null;

  /**
   * Render the row data by filtering out any action columns and mapping over the rest of the columns.
   * For each column, the appropriate value is rendered based on its type.
   */
  const renderRowData = () => {
    return titles
      ?.filter((column: any) => !column.isActionColumn)  // Filter out action columns
      .map((column: any) => {
        const key = column.id;
        if (!key || !rowData.hasOwnProperty(key)) return null;  // Skip if there is no data for the column

        const value = rowData[key];

        return (
          <Typography
            key={key}
            variant="body2"
            color="text.primary"
            gutterBottom
            sx={{ display: "flex" }}
          >
            {/* Render the image if specified in the column config */}
            {column.isImage && value !== "" ? (
              <>
                <img
                  src={concatImagePathAndBaseUrl(value)}  // Utility function to resolve image URL
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
                <span>{renderValue(key, value, column)}</span>  {/* Render the value based on type */}
              </>
            )}
          </Typography>
        );
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>حذف اطلاعات</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟
        </Typography>
        {renderRowData()} {/* Render the data of the record to be deleted */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" variant="outlined">
          لغو
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          حذف 
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
