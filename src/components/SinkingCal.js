import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Grid,
  Box,
  TextField,
  CssBaseline,
  Button,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

import { ArrowBack, House } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const unit = [
  { label: "sqft", value: "sqft" },
  { label: "sqm", value: "sqm" },
];

const myStyle = {
  "& label.Mui-focused": {
    color: "gold",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gold",
    },

    "&:hover fieldset": {
      borderColor: "gold",
    },

    "&.Mui-focused fieldset": {
      borderColor: "gold",
    },
  },
};

export const SinkingCal = () => {
  let navigate = useNavigate();
  const initialFormData = {
    pa: "",
    paa: "",
    f3: "",
    unitPAA: "sqm",
    unitPA: "sqm",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [value, setValue] = useState("0.00");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id || e.target.name]: e.target.value,
    });
  };

  const handleReset = (e) => {
    setFormData(initialFormData);
    setValue(0);
  };

  const convertToSqm = (value, unit) => {
    // Conversion factor from sqft to sqm
    const sqftToSqmConversionFactor = 0.092903;

    if (unit === "sqft") {
      // Convert value to sqm
      return (value * sqftToSqmConversionFactor).toFixed(2);
    }

    // If the unit is already in sqm, return the original value
    return value;
  };

  const handleClick = (e) => {
    console.log(formData);
    const f3 = formData.f3;
    const convertedPAA = convertToSqm(formData.paa, formData.unitPAA);
    const convertedPA = convertToSqm(formData.pa, formData.unitPA);
    // Now you can use the calculated F1 value in your equation.
    const result = (convertedPA * 0.8 + convertedPAA * f3).toFixed(2);
    setValue(result);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          marginTop: "80px",
          minWidth: 450,
          maxWidth: 550,
          border: "solid",
          bgcolor: "white",
          borderColor: "gold",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item sm={2} xs={2}>
            <House
              sx={{
                padding: "5px",
                fontSize: "4.4rem",
                color: "white",
                bgcolor: "gold",
                borderRadius: "35px",
                cursor: "pointer",
              }}
            />
          </Grid>
          <Grid item sm={10} xs={10} alignItems="left">
            <Tooltip title="(A x 0.8) + (B x F³)" placement="right">
              <Typography variant="h4" color="gold" sx={{ fontWeight: "bold" }}>
                Maintenance Fee Landed Properties
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item sm={8} xs={8}>
            <TextField
              fullWidth
              sx={myStyle}
              id="pa"
              label="Parcel Area (A)"
              name="parcel area"
              type="number"
              required
              value={formData.pa}
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={4} xs={4}>
            <Autocomplete
              isOptionEqualToValue={(option, value) => option.id === value.id}
              fullWidth
              sx={myStyle}
              value={formData.unitPA}
              disablePortal
              id="unitPA"
              options={unit}
              renderInput={(params) => <TextField {...params} label="unit" />}
              onChange={(e, newValue) => {
                setFormData({
                  ...formData,
                  unitPA: newValue ? newValue.value : "", // Set the selected value
                });
              }}
            />
          </Grid>
          <Grid item sm={8} xs={8}>
            <TextField
              fullWidth
              sx={myStyle}
              id="paa"
              name="accessory parcel area"
              label="Accessory Parcel Area (B)"
              type="number"
              value={formData.paa}
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={4} xs={4}>
            <Autocomplete
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={formData.unitPAA}
              fullWidth
              sx={myStyle}
              disablePortal
              id="unitPAA"
              options={unit}
              renderInput={(params) => <TextField {...params} label="unit" />}
              onChange={(e, newValue) => {
                setFormData({
                  ...formData,
                  unitPAA: newValue ? newValue.value : "", // Set the selected value
                });
              }}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <FormControl fullWidth sx={myStyle} required>
              <InputLabel>Parking Space (F3 Score)</InputLabel>
              <Select
                value={formData.f3}
                label="Parking Space (F3 Score)"
                onChange={(e) =>
                  setFormData({ ...formData, f3: e.target.value })
                }
              >
                <MenuItem value={0.5}>Indoor</MenuItem>
                <MenuItem value={0.25}>Outdoor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4} xs={4}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "gold",
                color: "white",
                "&:hover": {
                  backgroundColor: "gold",
                  color: "black",
                },
              }}
              onClick={handleClick}
            >
              Calculate
            </Button>
          </Grid>
          <Grid item sm={4} xs={4}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "gold",
                color: "white",
                "&:hover": {
                  backgroundColor: "gold",
                  color: "black",
                },
              }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={10} sm={10}>
            <div>
              <Typography
                style={{ marginLeft: "13px", marginTop: "20px" }}
                variant="h3"
              >
                <span>Rm</span>
                {value} <span style={{ fontSize: "small" }}>/month</span>
              </Typography>
              <Typography
                style={{ marginLeft: "13px" }}
                variant="body"
                fontWeight="light"
                fontStyle="italic"
              >
                *Sinking Fees is 10% of maintenance fees
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2} sm={2} alignSelf="end" alignItems="flex-end">
            <ArrowBack
              sx={{
                fontSize: "40px",
                color: "white",
                bgcolor: `gold`,
                borderRadius: "30px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/calculators");
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
