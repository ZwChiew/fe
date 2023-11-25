import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Autocomplete from "@mui/material/Autocomplete";
import {
  TextField,
  Button,
  Tooltip,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Apartment, ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const unit = [
  { label: "sqft", value: "sqft" },
  { label: "sqm", value: "sqm" },
];

const myStyle = {
  "& label.Mui-focused": {
    color: "orange",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "orange",
    },

    "&:hover fieldset": {
      borderColor: "orange",
    },

    "&.Mui-focused fieldset": {
      borderColor: "orange",
    },
  },
};

export const MaintenanceCal = () => {
  let navigate = useNavigate();
  const initialFormData = {
    pa: "",
    paa: "",
    f11: "", //lift
    f12: "", //air con
    f2: "",
    f3: "",
  };
  const err = "This is a required field";
  const [formData, setFormData] = useState(initialFormData);
  const [value, setValue] = useState("0.00");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id || e.target.name]: e.target.value,
    });
  };

  let F1;
  const computeF1 = () => {
    if (formData.f11 === 0 && formData.f12 === 0) {
      F1 = 0.85;
    } else if (formData.f11 === 1 && formData.f12 === 0) {
      F1 = 1.0;
    } else if (formData.f11 === 0 && formData.f12 === 1) {
      F1 = 1.15;
    } else {
      F1 = 1.3;
    }
  };

  const handleReset = (e) => {
    setFormData(initialFormData);
    setValue(0);
  };

  const handleClick = (e) => {
    const { pa, paa, f2, f3 } = formData;
    computeF1();
    // Now you can use the calculated F1 value in your equation.
    const result = (pa * F1 * f2 + paa * f3).toFixed(2);
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
          borderColor: "orange",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item sm={2} xs={2}>
            <Apartment
              sx={{
                padding: "5px",
                fontSize: "4.5rem",
                color: "white",
                bgcolor: "orange",
                borderRadius: "35px",
                cursor: "pointer",
              }}
            />
          </Grid>
          <Grid item sm={10} xs={10} alignItems="left">
            <Tooltip title="(A x F¹ x F²) + (B x F³)" placement="right">
              <Typography
                variant="h4"
                color="orange"
                sx={{ fontWeight: "bold" }}
              >
                Maintenance Fee High-Rise Properties
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
              defaultValue={"sqm"}
              fullWidth
              sx={myStyle}
              disablePortal
              id="unitPA"
              options={unit}
              renderInput={(params) => <TextField {...params} label="unit" />}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <FormControl fullWidth required sx={myStyle}>
              <InputLabel>Common Lifts / Escalators (F1 Score)</InputLabel>
              <Select
                value={formData.f11}
                label="Common Lifts / Escalators (F1 Score)"
                onChange={(e) =>
                  setFormData({ ...formData, f11: e.target.value })
                }
              >
                <MenuItem value={0}>No</MenuItem>
                <MenuItem value={1}>Yes</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12}>
            <FormControl required fullWidth sx={myStyle}>
              <InputLabel>Air conditioned common areas (F1 Score)</InputLabel>
              <Select
                value={formData.f12}
                label="Air conditioned common areas (F1 Score)"
                onChange={(e) =>
                  setFormData({ ...formData, f12: e.target.value })
                }
              >
                <MenuItem value={0}>No</MenuItem>
                <MenuItem value={1}>Yes</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12}>
            <FormControl required fullWidth sx={myStyle}>
              <InputLabel>Nearest Facility Distance, m² (F2 Score)</InputLabel>
              <Select
                value={formData.f2}
                label="Nearest Facility Distance, m² (F2 Score)"
                onChange={(e) =>
                  setFormData({ ...formData, f2: e.target.value })
                }
              >
                <MenuItem value={0.85}>1000-3000</MenuItem>
                <MenuItem value={0.8}>&gt;3000</MenuItem>
                <MenuItem value={1}>&lt;1000</MenuItem>
              </Select>
            </FormControl>
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
              fullWidth
              defaultValue={"sqm"}
              sx={myStyle}
              disablePortal
              id="unitPAA"
              options={unit}
              renderInput={(params) => <TextField {...params} label="unit" />}
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
                backgroundColor: "orange",
                color: "white",
                "&:hover": {
                  backgroundColor: "orange",
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
                backgroundColor: "orange",
                color: "white",
                "&:hover": {
                  backgroundColor: "orange",
                  color: "black",
                },
              }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid>
          <Grid xs={10} sm={10}>
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
          <Grid xs={2} sm={2} alignSelf="end" alignItems="flex-end">
            <ArrowBack
              sx={{
                fontSize: "45px",
                color: "white",
                bgcolor: `orange`,
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
