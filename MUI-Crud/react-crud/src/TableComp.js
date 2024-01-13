import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { TablePagination } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5B9FE7",
    color: theme.palette.common.white,
    fontSize: 17,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function TableComp(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDelete = (id) => {
    setOpen(true);
    setItemToDelete(id); //set  the itm to delete
  };

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      props.delete(itemToDelete); // perform deletion
    }
    setOpen(false);
    setItemToDelete(null); //Reset item to delete
  };

  const handleCancel = () => {
    setOpen(false);
    setItemToDelete(null); //reset item to delete
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Paper>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Device</StyledTableCell>
                <StyledTableCell>IP Address</StyledTableCell>
                <StyledTableCell>Mac Address</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.products
                .filter((item) =>
                  props.search.toLowerCase()
                    ? item.device
                        .toLowerCase()
                        .includes(props.search.toLowerCase())
                    : true
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                .map((data) => (
                  <React.Fragment key={data.id}>
                    <TableRow
                      key={data.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {data.device}
                      </TableCell>
                      <TableCell>{data.ip_address}</TableCell>
                      <TableCell>{data.mac_address}</TableCell>
                      <TableCell>{data.description}</TableCell>
                      <TableCell>
                        <Fab
                          color="success"
                          aria-label="edit"
                          size="small"
                          sx={{ margin: "0.2rem" }}
                          onClick={() => {
                            props.edit(data);
                          }}
                        >
                          <EditIcon />
                        </Fab>
                        <Fab
                          color="error"
                          aria-label="delete"
                          size="small"
                          sx={{ margin: "0.2rem" }}
                          onClick={() => {
                            // console.log("Selected ID = ", data.id);
                            // props.delete(data.id)
                            setOpen(true);
                            handleDelete(data.id);
                          }}
                        >
                          <ClearRoundedIcon />
                        </Fab>
                      </TableCell>
                    </TableRow>

                    <Dialog
                      open={open && itemToDelete === data.id}
                      onClose={handleCancel}
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        opacity: 1,
                      }}
                      //overlayStyle={{ backgroundColor: "transparent" }}
                      slotProps={{
                        backdrop: {
                          sx: {
                            background: "rgba(250, 250, 250, 0)",
                          },
                        },
                      }}
                      //key={props.products.id}
                    >
                      <DialogTitle>Confirm Delete</DialogTitle>
                      <DialogContent>
                        Are you sure you want to delete this product?
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button
                          onClick={() => {
                            setOpen(false);
                            // props.delete(data.id);
                            // console.log( props.delete(data.id));
                            //props.delete(props.products.id);
                            //handleDelete();
                            console.log("Selected ID = ", data.id);
                            handleConfirmDelete();
                          }}
                        >
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.products.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        ></TablePagination>
      </Paper>
    </div>
  );
}

export default TableComp;
