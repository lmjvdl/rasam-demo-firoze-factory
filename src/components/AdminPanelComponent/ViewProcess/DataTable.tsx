"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconUserExclamation } from "@tabler/icons-react";

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  onAdditionalAction
}) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} style={{ textAlign: "center" }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ textAlign: "center" }}>
                  {!column.isAdditionalAction && column.isActionColumn ? (
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
                  ) : Array.isArray(row[column.id]) ? (
                    row[column.id].join(", ")
                  ) : (
                    row[column.id]
                  )}
                  {column.isAdditionalAction && column.isActionColumn ? (
                    <>
                      <IconButton onClick={() => onAdditionalAction?.(row)}>
                        <IconUserExclamation />
                      </IconButton>
                    </>
                  ): null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
