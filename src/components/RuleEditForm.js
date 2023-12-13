import { Grid, TextField, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setGlobalState, useGlobalState } from "./context";
import { useState } from "react";
import { db } from "../firebase-config";
import { collection, updateDoc, doc, addDoc } from "firebase/firestore";
import axios from "axios";

export const EditFormRule = () => {
  let entry = useGlobalState("EditingEntry")[0];
  const [formData, setFormData] = useState(entry);
  const [messages, setMessages] = useState(formData.dataset.join("\n\n"));

  const handleMessagesChange = (event) => {
    setMessages(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      dataset: messages.split("\n\n"),
    }));
  };

  const ruleCollectionRef = collection(db, "rules");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setGlobalState("loading", true);
    if (!formData.id) {
      await addDoc(ruleCollectionRef, formData);
    } else {
      const userDoc = doc(db, "rules", formData.id);
      await updateDoc(userDoc, formData);
    }
    var myParams = {
      data: "KB Updated",
    };
    await axios
      .post("http://localhost:5000/api/noti", myParams)
      .then(function (response) {
        let output = response.data;
        console.log(output);
      })
      .catch(function (error) {
        console.log(error);
      });

    setGlobalState("EditingEntry", {});
    setGlobalState("loading", false);
    navigate("/KBMS");
  };

  let navigate = useNavigate("");
  return (
    <Paper sx={{ padding: "30px", marginTop: "60px", width: "90%" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label="FAQ Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            disabled
            fullWidth
            label="Id"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={3}
            fullWidth
            label="Model Answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleMessagesChange}
            variant="outlined"
            label="Question Set"
            multiline
            rows={10}
            value={messages}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} sm={3} xl={2} lg={2}>
          <Button
            onClick={() => navigate("/KBMS")}
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