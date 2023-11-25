import { Grid, TextField, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setGlobalState, useGlobalState } from "./context";
import { useState } from "react";
import { db } from "../firebase-config";
import { collection, updateDoc, doc, addDoc } from "firebase/firestore";
import { useViewport } from "react-viewport-hooks";

export const EditFormUser = () => {
  let entry = useGlobalState("EditingEntry")[0];
  const [formData, setFormData] = useState(entry);
  const userCollectionRef = collection(db, "users");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
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
  };

  let navigate = useNavigate("");
  return (
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
        <Grid item xs={12}>
          {/* <TextareaAutosize
            style={{ width: "90%", minHeight: "10px" }}
            minRows={3}
            maxRows={10}
            name="message"
            label="ChatHistory"
            value={formData.messages}
            // onChange={handleChange}
          /> */}
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
  );
};
