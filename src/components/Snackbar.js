import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";

import MuiAlert from "@mui/material/Alert";

const ErrorSnackbar = ({ message, c }) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      autoHideDuration={8000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={c} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
