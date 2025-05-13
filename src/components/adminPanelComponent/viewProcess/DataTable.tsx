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
  Alert,
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
}) => {
  const validData = Array.isArray(data) ? data : [];
  const visibleColumns = columns.filter(
    (column) => column.showOnTable !== false
  );

  return (
    <Box sx={{ marginTop: "35px", padding: "16px" }}>
      <TableContainer sx={{ borderRadius: "10px", overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow>
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
                      {column.isImage && value !== "" ? (
                        <>
                          <img
                            src={concatImagePathAndBaseUrl(value)}
                            alt=""
                            style={{ width: "25px", height: "25px" }}
                          />
                        </>
                      ) : column.render ? (
                        column.render(row)
                      ) : column.isActionColumn ? (
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
                      ) : isArray && isArrayColumn ? (
                        value.map((item: any, index: number) => (
                          <span key={index}>
                            {truncateText(item[isArrayColumn] || item)}
                            {index < value.length - 1 ? ", " : ""}
                          </span>
                        ))
                      ) : isArray ? (
                        truncateText(value.join(", "))
                      ) : (
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TablePagination
          component="div"
          count={count}
          rowsPerPage={7}
          page={page}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          sx={{ display: "flex", justifyContent: "center" }}
          labelRowsPerPage=""
          rowsPerPageOptions={[]}
        />
      </Box>
    </Box>
  );
};

export default DataTable;
