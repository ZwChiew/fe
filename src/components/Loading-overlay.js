import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ReactLoading from "react-loading";
import { useGlobalState } from "./context";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1400,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(18, 18, 18, 0.2)",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(18, 18, 18, 0.34)",
    width: 400,
    height: 300,
    flexDirection: "column",
    borderRadius: 20,
  },
}));

export const LoadingOverlay = () => {
  const classes = useStyles();

  const [isLoading] = useGlobalState("loading");

  if (!isLoading) return null;

  return (
    <div className={classes.root}>
      <div className={classes.overlay}>
        <Typography variant="h6" style={{ marginBottom: 20, color: "white" }}>
          Loading Resources...
        </Typography>
        <ReactLoading type="balls" color="#ffffff" height={100} width={100} />
      </div>
    </div>
  );
};
