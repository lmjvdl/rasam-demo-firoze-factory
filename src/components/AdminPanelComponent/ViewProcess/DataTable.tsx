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
  TablePagination,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  page,
  totalPages,
  onPageChange,
}) => {
  console.log("Table Data:", data);
  console.log("Page:", page, "Total Pages:", totalPages);

  const validData = Array.isArray(data) ? data : [];
  const currentPage = page < totalPages ? page : 0;

  return (
    <Paper sx={{ marginTop: "50px", padding: "16px" }}>
      <TableContainer>
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
            {validData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ textAlign: "center" }}>
                    {column.render ? (
                      column.render(row)
                    ) : !column.isAdditionalAction && column.isActionColumn ? (
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
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
        <TablePagination
          component="div"
          count={validData.length}
          page={currentPage}
          rowsPerPage={8}
          rowsPerPageOptions={[8]}
          onPageChange={(event, newPage) => onPageChange(newPage)}
        />
      </Box>
    </Paper>
  );
};

export default DataTable;
