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
import { Typewriter, TypingAnimation } from "./Typewritter";
import ErrorSnackbar from "./Snackbar";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const ES = () => {
  let id = useGlobalState("userId")[0];
  let historyChat = useGlobalState("messages");
  const [chat, setChat] = useState(historyChat[0]);
  const [local, setLocal] = useState(historyChat[0]);
  const [Message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [prev, setPrev] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {}, [isSending]);

  useEffect(() => {
    setGlobalState("messages", chat);
    let newFields = { messages: chat };
    let userDoc = doc(db, "users", id);
    updateDoc(userDoc, newFields);
  }, [chat, id]);

  const handleSendMessage = async () => {
    setIsSending(true);
    if (Message.trim() !== "") {
      setTyping(true);
      // Append the user message to newChat
      if (prev.trim() !== "") {
        setLocal((prevChat) => [...prevChat, prev]);
      }
      setLocal((prevChat) => [...prevChat, Message]);
      setChat((prevChat) => [...prevChat, Message]);
      var myParams = {
        data: Message,
      };
      await axios
        .post("http://localhost:5000/api/query", myParams)
        .then(function (response) {
          let output1 = response.data;
          setTyping(false);
          setPrev(output1);
          setChat((prevChat) => [...prevChat, output1]);
        })
        .catch(function (error) {
          console.log(error);
          if (error.response.data.error) {
            // Log the error message from the server
            console.error("Server error message:", error.response.data.error);
          } else {
            console.error("Unexpected error:", error.message);
          }
          setError(true);
          setChat((prevChat) => [...prevChat.slice(0, -1)]);
        });
      setMessage("");
      setIsSending(false);
    }
  };

  const [arrowAtBottom, setArrowAtBottom] = useState(true);

  const handleArrowClick = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // Optional: Add smooth scrolling
    });

    setTimeout(() => {
      setArrowAtBottom(true);
    }, 1000);
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
          {local.map((message, index) => (
            <div
              key={index}
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
                  padding: "12px",
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
        {prev !== "" && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                backgroundColor: "#f0f0f0",
                color: "#000",
                padding: "12px",
                borderRadius: "10px",
              }}
            >
              <Typography style={{ whiteSpace: "pre-line" }}>
                {prev !== "" ? (
                  typing ? (
                    <TypingAnimation></TypingAnimation>
                  ) : (
                    <Typewriter text={prev.replace(/\\n/g, "\n")} delay={10} />
                  )
                ) : (
                  <></>
                )}
              </Typography>
            </div>
          </div>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{ marginTop: "80px", marginBottom: "20px" }}
              fullWidth
              disabled={isSending}
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
      {error && (
        <ErrorSnackbar
          message={"Chat engine offline, please refresh the page"}
          c={"error"}
        ></ErrorSnackbar>
      )}

      <IconButton
        style={{
          position: "fixed",
          bottom: arrowAtBottom ? "20px" : "auto",
          top: arrowAtBottom ? "auto" : "20px",
          right: "20px",
        }}
        onClick={handleArrowClick}
      >
        <ArrowDownwardIcon />
      </IconButton>
    </Container>
  );
};
