import React from "react";
import { TextField } from "@mui/material";

export default function CustomTextField({
  label,
  value,
  setValue,
  zIndex,
  flag,
  type,
  ...restProps
}) {
  return (
    <TextField
      error={flag}
      label={label}
      variant="outlined"
      fullWidth
      value={
        !!type && type === "date" && value !== ""
          ? value.substring(0, 4) +
            "-" +
            value.substring(4, 6) +
            "-" +
            value.substring(6)
          : value
      }
      onChange={(e) => {
        if (!!type && type === "date" && e.target.value !== "") {
          setValue(e.target.value.replace(/-/gi, ""));
        } else {
          setValue(e.target.value);
        }
      }}
      type={type}
      {...restProps}
    />
  );
}
