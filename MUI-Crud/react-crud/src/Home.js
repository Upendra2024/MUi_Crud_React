import "./App.css";
import { useEffect, useState } from "react";
import TableComp from "./TableComp";
import FormComp from "./Form";
import { getData, deleteData, postData, putData } from "./Api";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Container } from "@mui/system";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import Navbar from "./Navbar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "35rem",
    },
  },
}));

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  //const [isEditMode, setIsEditMode] = useState(true);

  //console.log(search);
  const [initialForm, setInitialForm] = useState({
    device: "",
    ip_address: "",
    mac_address: "",
    description: "",
  });
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    getProducts();
  }, []);

  //for getting data
  let getProducts = async () => {
    let res = await getData();
    setProducts(res.data);
  };

  //for deleting data
  let deleteProducts = async (id) => {
    await deleteData(id);
    getProducts();
  };
  //for add data

  let addProduct = async (product) => {
    let data = {
      device: product.device,
      ip_address: product.ip_address,
      mac_address: product.mac_address,
      description: product.description,
    };

    if (edit) {
      await putData(product.id, data);
      getProducts();
      console.log(product.id);
    } else {
      await postData(data);
      console.log(data);
      getProducts();
      closepopup();
    }
  };

  //for edit data
  let editProduct = async (data) => {
    openpopup();
    setEdit(true);
    console.log(data.id);
    setInitialForm(data);
    getProducts();
  };

  //add popup

  const [open, openchange] = useState(false);
  const functionadd = () => {
    openpopup();
  };

  const closepopup = () => {
    openchange(false);
  };
  const openpopup = () => {
    openchange(true);
    setInitialForm({
      device: "",
      ip_address: "",
      mac_address: "",
      description: "",
    });
  };

  return (
    <>
      <Navbar style={{ position: "sticky" }} />
      <div style={{ background: "#E2F1FA", minHeight: "100vh" }}>
        <Container sx={{ width: "80%", paddingTop: "5rem" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <AppBar position="static">
              <Toolbar
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                </Search>
                <Fab
                  color="secondary"
                  aria-label="add"
                  size="small"
                  onClick={() => {
                    functionadd();
                    setEdit(false);
                  }}
                >
                  <AddIcon />
                </Fab>
              </Toolbar>
            </AppBar>
          </Box>

          <TableComp
            products={products}
            delete={deleteProducts}
            edit={editProduct}
            search={search}
          />
        </Container>
        <Dialog open={open} fullWidth maxWidth="sm">
          <DialogTitle>
            <Typography variant="h5" marginLeft="1rem" color="#ee964b">
              Device Details
            </Typography>
          </DialogTitle>
          <DialogContent>
            <div>
              <FormComp
                data={initialForm}
                edit={editProduct}
                add={addProduct}
                closepopup={closepopup}
                //editMode = {isEditMode}
                //setIsEditMode={isEditMode}
                setedit={edit}
                //getProducts={getProducts}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Home;
