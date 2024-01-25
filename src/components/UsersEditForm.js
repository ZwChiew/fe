import { Grid, TextField, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setGlobalState, useGlobalState } from "./context";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, updateDoc, doc, addDoc } from "firebase/firestore";
import ErrorSnackbar from "./Snackbar";

export const EditFormUser = () => {
  let entry = useGlobalState("EditingEntry")[0];
  const [formData, setFormData] = useState(entry);
  const userCollectionRef = collection(db, "users");
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError(false);
      }, 3000);

      // Clear the timeout to avoid unnecessary state updates
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  const handleSave = async () => {
    if (
      formData.name.trim() === "" ||
      formData.password.trim() === "" ||
      formData.fullname.trim() === "" ||
      formData.position.trim() === "" ||
      formData.address.trim() === ""
    ) {
      setError(true);
      return;
    }

    setGlobalState("loading", true);
    if (!formData.id) {
      await addDoc(userCollectionRef, formData);
    } else {
      const userDoc = doc(db, "users", formData.id);
      await updateDoc(userDoc, formData);
    }
    setGlobalState("loading", false);
    setGlobalState("EditingEntry", {});
    navigate("/users");
    setGlobalState("success", true);
  };

  let navigate = useNavigate("");
  return (
    <>
      <Paper sx={{ padding: "30px", marginTop: "60px", width: "90%" }}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              disabled
              fullWidth
              label="Id"
              name="name"
              value={formData.id}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Username"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2} sm={3} xl={2} lg={2}>
            <Button
              onClick={() => navigate("/users")}
              size="large"
              variant="contained"
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={handleSave} size="large" variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {error && (
        <ErrorSnackbar
          message={
            "Please make sure all fields are filled in before submitting"
          }
          c={"error"}
        ></ErrorSnackbar>
      )}
    </>
  );
};
