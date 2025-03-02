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
  count,
  page,
  onPageChange,
}) => {
  const validData = Array.isArray(data) ? data : [];

  const visibleColumns = columns.filter(column => column.showOnTable !== false);

  return (
    <Paper sx={{ marginTop: "35px", padding: "16px" }}>
      <TableContainer>
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
                {visibleColumns.map((column) => (
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
    </Paper>
  );
};

export default DataTable;

