import { setGlobalState } from "./context";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { InputAdornment, IconButton, Button, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import strata1 from "../images/strata1.jpg";
import strata2 from "../images/strata2.jpg";
import strata3 from "../images/strata3.jpg";
import logo from "../images/logo.png";
import CustomTextField from "./Custom-text-field";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../api/Auth";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "550px",
  },
  login: {
    height: "100%",
    width: "30rem",
    padding: "0 3rem 0 2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // [theme.breakpoints.down("md")]: {
    //   width: "auto",
    //   padding: "10rem 0 5rem 0",
    // },
  },
  logo: {
    width: "10rem",
    objectFit: "contain",
    margin: 10,
    alignSelf: "center",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    marginBottom: "5rem",
    "& > button, & > div": {
      width: "100%",
      marginTop: "0.5rem",
    },
  },
  carousel: {
    width: "100%",
    height: "100vh",
    minHeight: "550px",
    position: "relative",
    "& img": {
      height: "100vh",
      minHeight: "550px",
    },
    // [theme.breakpoints.down("md")]: {
    //   display: "none",
    // },
  },
}));

export const SigninPage = () => {
  let navigate = useNavigate();
  const classes = useStyles();
  const images = [strata1, strata2, strata3];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [users, setUsers] = useState([]);

  const userCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, [userCollectionRef]);

  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, ms);
    });
  }

  async function signin() {
    setGlobalState("loading", true);
    let flag = await LoginUser(users, username, password);
    await delay(1000);
    setGlobalState("loading", false);
    if (flag) {
      setErrorMessage(false);
      navigate("/home");
      setGlobalState("auth", true);
    } else {
      setErrorMessage(true);
    }
  }

  return (
    <div style={{ position: "relative", minWidth: "450px" }}>
      <div className={classes.root}>
        <div className={classes.login}>
          <img src={logo} alt="logo" className={classes.logo} />
          <form className={classes.form}>
            <CustomTextField
              flag={errorMessage}
              type="string"
              label="username"
              value={username}
              setValue={setUsername}
              InputProps={{
                required: true,
              }}
            />
            <CustomTextField
              type={showPassword ? "text" : "password"}
              label={"password"}
              value={password}
              setValue={setPassword}
              flag={errorMessage}
              InputProps={{
                required: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errorMessage ? (
              <Typography sx={{ color: "red" }}>
                Incorrect Email or Password
              </Typography>
            ) : (
              <></>
            )}
            <Button
              onClick={signin}
              variant="contained"
              style={{
                backgroundColor: "#202b3d",
              }}
            >
              Login
            </Button>
          </form>
        </div>

        <div className={classes.carousel}>
          <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            transitionTime={1000}
            emulateTouch={true}
          >
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt="carousel" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
