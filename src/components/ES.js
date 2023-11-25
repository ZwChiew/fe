import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  IconButton,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { setGlobalState, useGlobalState } from "./context";
import { db } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import axios from "axios";
import Typewriter from "./Typewritter";

export const ES = () => {
  let id = useGlobalState("userId")[0];
  let historyChat = useGlobalState("messages");
  const [chat, setChat] = useState(historyChat[0]);
  const [Message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [typing, setIsTyping] = useState("");

  useEffect(() => {
    setGlobalState("messages", chat);
    let newFields = { messages: chat };
    let userDoc = doc(db, "users", id);
    updateDoc(userDoc, newFields);
  }, [chat]);

  const handleSendMessage = async () => {
    setIsTyping("Hello world");
    // if (Message.trim() !== "") {
    //   // Append the user message to newChat
    //   setIsSending(true);
    //   setChat((prevChat) => [...prevChat, Message]);
    //   var myParams = {
    //     data: Message,
    //   };
    //   await axios
    //     .post("http://localhost:5000/api/query", myParams)
    //     .then(function (response) {
    //       let output1 = response.data;
    //       setChat((prevChat) => [...prevChat, output1]);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   setMessage("");
    //   // Simulate the chatbot response
    //   setIsSending(false);
    // }
  };

  return (
    <Container
      maxWidth="xl"
      style={{
        marginTop: "30px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} style={{ padding: "24px", maxWidth: "100%" }}>
        <Typography sx={{ marginBottom: "30px" }} variant="h4">
          Ask Anything
        </Typography>
        <div style={{ marginBottom: "30px" }}>
          {chat.map((message, index) => (
            <div
              style={{
                display: "flex",
                justifyContent: index % 2 !== 0 ? "flex-end" : "flex-start",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  backgroundColor: index % 2 !== 0 ? "#2196F3" : "#f0f0f0",
                  color: index % 2 !== 0 ? "#fff" : "#000",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <Typography style={{ whiteSpace: "pre-line" }}>
                  {message.replace(/\\n/g, "\n")}
                </Typography>
              </div>
            </div>
          ))}
        </div>
        {isTyping !== "" && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                backgroundColor: "#2196F3",
                color: "#fff",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Typography style={{ whiteSpace: "pre-line" }}>
                <Typewriter text={"hello world"} delay={100} />
              </Typography>
            </div>
          </div>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{ marginTop: "80px", marginBottom: "20px" }}
              fullWidth
              label="Type a message..."
              variant="outlined"
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    disabled={isSending}
                    edge="end"
                    onClick={handleSendMessage}
                  >
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};