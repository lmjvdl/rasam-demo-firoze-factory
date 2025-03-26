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
                <TableCell key={column.id} style={{ textAlign: "center" }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {validData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {visibleColumns.map((column) => {
                  const isArray = Array.isArray(row[column.id]);
                  const isArrayColumn = arrayColumns[column.id];

                  return (
                    <TableCell key={column.id} style={{ textAlign: "center" }}>
                      {column.isImage ? (
                        <img
                          src={row[column.id]}
                          alt="Image"
                          style={{ width: "25px", height: "25px" }}
                        />
                      ) : column.render ? (
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
                      ) : isArray && isArrayColumn ? (
                        <div>
                          {row[column.id].map((item: any, index: number) => (
                            <span key={index}>
                              {item[isArrayColumn] || item}
                              {index < row[column.id].length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                      ) : isArray ? (
                        truncateText(row[column.id].join(", "))
                      ) : (
                        truncateText(row[column.id])
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <TablePagination
          count={count}
          rowsPerPage={7}
          page={page}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
          labelRowsPerPage=""
          rowsPerPageOptions={[]}
        />
      </div>
    </Box>
  );
};

export default DataTable;
