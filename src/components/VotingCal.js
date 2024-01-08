import React from "react";
import {
  CssBaseline,
  TextField,
  Button,
  Tooltip,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { HowToVote, ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const myStyle = {
  "& label.Mui-focused": {
    color: "dodgerblue",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "dodgerblue",
    },

    "&:hover fieldset": {
      borderColor: "dodgerblue",
    },

    "&.Mui-focused fieldset": {
      borderColor: "dodgerblue",
    },
  },
};

export const VotingCal = () => {
  let navigate = useNavigate();
  const initialFormData = {
    a: "",
    b: "",
    b1: "",
    c: "",
    c1: "",
    d: "",
    d1: "",
    e: "",
    e1: "",
    f: "",
    f1: "",
  };
  const StrataType = [{ id: "f", label: "Enter your strata unit size" }];
  ["b", "c", "d", "e"].forEach((id) => {
    StrataType.push({
      id,
      label: `Enter type ${id.toUpperCase()} strata unit size (0 if none)`,
    });
  });

  const [formData, setFormData] = useState(initialFormData);
  const [value, setValue] = useState("0");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id || e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setValue(0);
  };

  const handleClick = () => {
    console.log(formData);
    const { a, b, b1, c, c1, d, d1, e, e1, f, f1 } = formData;
    // Now you can use the calculated F1 value in your equation.
    let w = 100 / (b * b1 + c * c1 + d * d1 + e * e1 + f * f1);
    const result = (a * w).toFixed(2);
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
          borderColor: "dodgerblue",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item sm={2} xs={2}>
            <HowToVote
              sx={{
                padding: "6px",
                fontSize: "4.2rem",
                color: "white",
                bgcolor: "dodgerblue",
                borderRadius: "35px",
                cursor: "pointer",
              }}
            />
          </Grid>
          <Grid item sm={10} xs={10} alignItems="left">
            <Tooltip
              title="Share Unit is directly proportional to size of unit"
              placement="right"
            >
              <Typography
                variant="h3"
                color="dodgerblue"
                sx={{ fontWeight: "bold" }}
              >
                Share Unit
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item sx={12} xs={12} spacing={2}>
            <Tooltip
              placement="right"
              title="enter size of all type of strata unit in your property in sqm"
            >
              <Grid container>
                <Grid item sm={12} xs={12}>
                  <TextField
                    key="a"
                    fullWidth
                    required
                    sx={myStyle}
                    style={{ marginTop: "15px" }}
                    id="a"
                    label="Please enter your unit size"
                    type="number"
                    value={formData["a"]}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item sm={4} xs={4}></Grid>
              </Grid>
              {StrataType.map((type) => (
                <Grid container spacing={2.0}>
                  <Grid item sm={8} xs={8}>
                    <TextField
                      key={type.id}
                      fullWidth
                      required
                      sx={myStyle}
                      style={{ marginTop: "15px" }}
                      id={type.id}
                      label={type.label}
                      type="number"
                      value={formData[type.id]}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <TextField
                      key={`${type.id}1`}
                      fullWidth
                      required
                      sx={myStyle}
                      style={{ marginTop: "15px" }}
                      id={`${type.id}1`}
                      label="number of units"
                      type="number"
                      value={formData[`${type.id}1`]}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              ))}{" "}
            </Tooltip>
          </Grid>

          <Grid item sm={4} xs={4}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "dodgerblue",
                color: "white",
                "&:hover": {
                  backgroundColor: "dodgerblue",
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
                backgroundColor: "dodgerblue",
                color: "white",
                "&:hover": {
                  backgroundColor: "dodgerblue",
                  color: "black",
                },
              }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid>
          <Grid item sm={10} xs={10}>
            <div>
              <Typography
                style={{ marginLeft: "13px", marginTop: "20px" }}
                variant="h3"
              >
                {value} share <span style={{ fontSize: "small" }}>/units</span>
              </Typography>
              <Typography
                style={{ marginLeft: "13px" }}
                variant="body"
                fontWeight="light"
                fontStyle="italic"
              >
                *For this unit size
              </Typography>
            </div>
          </Grid>
          <Grid item sm={2} xs={2} alignSelf="end" alignItems="end">
            <ArrowBack
              sx={{
                fontSize: "45px",
                color: "white",
                bgcolor: `dodgerblue`,
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
