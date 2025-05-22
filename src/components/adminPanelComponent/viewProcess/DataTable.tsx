/**
 * DataTable Component
 *
 * A reusable and customizable table component built with Material UI.
 * It supports:
 * - Dynamic columns with optional visibility
 * - Custom rendering per column
 * - Action columns with View, Edit, Delete buttons
 * - Image and key-value object handling
 * - Array rendering with optional nested field extraction
 * - Pagination control
 *
 * Props:
 * - columns: List of column definitions with rendering and metadata options
 * - data: Array of row data to be displayed
 * - onView, onEdit, onDelete: Optional handlers for action buttons
 * - count: Total number of data entries (used for pagination)
 * - page: Current active page
 * - onPageChange: Pagination page change handler
 * - arrayColumns: Optional configuration to specify keys to extract from arrays
 */

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { truncateText } from "@/utils/formatters/truncateText";
import concatImagePathAndBaseUrl from "@/utils/formatters/contcatImagePathAndBaseUrl";
import { DataTableProps } from "@/interfaces/admin/general";

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  count,
  page,
  onPageChange,
  arrayColumns = {},
  keyObjectValMap,
}) => {
  // Ensure valid data is always an array
  const validData = Array.isArray(data) ? data : [];

  // Filter only columns that should be shown
  const visibleColumns = columns.filter(
    (column) => column.showOnTable !== false
  );

  return (
    <Box sx={{ marginTop: "35px", padding: "16px" }}>
      <TableContainer sx={{ borderRadius: "10px", overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Render table headers dynamically based on visible columns */}
              {visibleColumns.map((column) => (
                <TableCell key={column.id} align="center">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {validData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {visibleColumns.map((column) => {
                  const value = row[column.id];
                  const isArray = Array.isArray(value);
                  const isArrayColumn = arrayColumns[column.id];

                  return (
                    <TableCell key={column.id} align="center">
                      {/* If the column is marked as an image and the value is not empty, render it as an <img> tag */}
                      {column.isImage && value !== "" ? (
                        <img
                          src={concatImagePathAndBaseUrl(value)}
                          alt=""
                          style={{ width: "25px", height: "25px" }}
                        />

                      ) : column.render ? (
                        // If the column has a custom render function provided, use it
                        column.render(row)

                      ) : column.isActionColumn ? (
                        // If this column is meant for actions (e.g., view/edit/delete), show related buttons
                        <>
                          <IconButton onClick={() => onView?.(row)}>
                            <VisibilityIcon color="primary" />
                          </IconButton>
                          <IconButton onClick={() => onEdit?.(row)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => onDelete?.(row)}>
                            <DeleteIcon color="warning" />
                          </IconButton>
                        </>

                      ) : column.isKeyValueObject && value && typeof value === "object" ? (
                        // If the value is an object (e.g., {key1: value1, key2: value2}), convert it to a readable string
                        truncateText(
                          Object.entries(value)
                            .map(([key, value]) => {
                              const label = keyObjectValMap?.get(Number(key)) || key;
                              return `${label}(${value})`;
                            })
                            .join(", ")
                        )

                      ) : isArray && isArrayColumn ? (
                        // If the value is an array and a specific key is provided in arrayColumns config,
                        // render that key from each item in the array
                        value.map((item: any, index: number) => (
                          <span key={index}>
                            {truncateText(item[isArrayColumn] || item)}
                            {index < value.length - 1 ? ", " : ""}
                          </span>
                        ))

                      ) : isArray ? (
                        // If the value is a plain array (e.g., ['a', 'b', 'c']), join and truncate the string
                        truncateText(value.join(", "))

                      ) : (
                        // Fallback case: any other type of value is truncated and displayed as text
                        truncateText(value)
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination section at bottom center */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TablePagination
          component="div"
          count={count}
          rowsPerPage={7}
          page={page}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          sx={{ display: "flex", justifyContent: "center" }}
          labelRowsPerPage=""
          rowsPerPageOptions={[]} // Hide rows-per-page dropdown
        />
      </Box>
    </Box>
  );
};

export default DataTable;
