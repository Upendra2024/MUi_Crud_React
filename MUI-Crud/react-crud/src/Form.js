import React, { useState } from "react";
import { ButtonGroup, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/base/FormControl";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormComp(props) {
  const [product, setProduct] = useState(props.data);
  const [errors, setErrors] = useState({
    device: "",
    ip_address: "",
    mac_address: "",
    description: "",
  });

  const setEdit = props.setedit;
  console.log(setEdit);
  //const [isEditMode, setIsEditMode] = useState(true);
  // useEffect(() => {
  //    setIsEditMode(true);
  //   setProduct(props.data);
  // }, [props.data]);

  console.log(props.setedit);
  const success = () =>
    toast.success("Data added successful !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const error = () =>
    toast.error(" data add failed !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  //handle validation
  const handleValidation = () => {
    let valid = true;
    const newErrors = { ...errors };

    //regex vlidation
    // Device field validation
    if (product.device.length <= 10) {
      newErrors.device = "Device name should not be less than 10 characters";
      valid = false;
    } else {
      newErrors.device = "";
    }

    // IP address regex validation
    const ipRegex =
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(product.ip_address)) {
      newErrors.ip_address = "Enter a valid IP address";
      valid = false;
    } else {
      newErrors.ip_address = "";
    }

    // MAC address regex validation
    const macRegex =
      /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/;
    if (!macRegex.test(product.mac_address)) {
      newErrors.mac_address = "Enter a valid MAC address";
      valid = false;
    } else {
      newErrors.mac_address = "";
    }

    // Description field validation
    const desRegex = /^(\S+\s+){3,}\S+$/;
    //const wordCount = 0;
    if (!desRegex.test(product.description)) {
      newErrors.description = "Description should be more than 3 words";
      valid = false;
    } else {
      console.log("form is validated");
      newErrors.description = "";
    }

    setErrors(newErrors);
    return valid;
  };

  //change form data
  let changeFormData = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  //handle submit data...

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      if (setEdit) {
        //update table
        //make fields disable  during edit

        props.edit(product);

        props.add(product);

        console.log(product);
      } else {
        props.add(product);
      }
      success();

      props.closepopup();
    } else {
      // Validation errors exist, do not submit form
      console.log("Form has validation errors");
      error();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} margin={2}>
          <FormControl defaultValue="" required>
            <TextField
              id="outlined-basic"
              label="Device Name"
              variant="outlined"
              name="device"
              fullWidth
              onChange={changeFormData}
              value={product.device}
              error={Boolean(errors.device)}
              helperText={errors.device}
            />
          </FormControl>
          <FormControl defaultValue="" required>
            <TextField
              id="outlined-basic"
              label="IP Address"
              name="ip_address"
              variant="outlined"
              fullWidth
              onChange={changeFormData}
              value={product.ip_address}
              error={Boolean(errors.ip_address)}
              helperText={errors.ip_address}
              disabled={setEdit}
            />
          </FormControl>
          <FormControl defaultValue="" required>
            <TextField
              id="outlined-basic"
              label="Mac Address"
              variant="outlined"
              name="mac_address"
              fullWidth
              onChange={changeFormData}
              value={product.mac_address}
              error={Boolean(errors.mac_address)}
              helperText={errors.mac_address}
              disabled={setEdit}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Description"
              placeholder="Enter text..."
              name="description"
              multiline
              minRows={3}
              m
              fullWidth
              onChange={changeFormData}
              value={product.description}
              error={Boolean(errors.description)}
              helperText={errors.description}
            />
          </FormControl>
          <ButtonGroup sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Button
              variant="contained"
              sx={{ order: "1", marginRight: "1rem" }}
              onClick={handleSubmit}
            >
              {setEdit ? "Update" : "Add"}
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                props.closepopup();
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
      <ToastContainer />
    </>
  );
}

export default FormComp;
