import { Grid, Box, Typography } from "@mui/material";
import { HowToVote, Apartment, House } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Activities = () => {
  let navigate = useNavigate();
  const activityTypes = [
    {
      id: "maintenance_fees",
      bgcolor: "orange",
      label: "High-Rise",
      icon: Apartment,
    },
    {
      id: "sinking_fees",
      bgcolor: "Gold",
      label: "Landed",
      icon: House,
    },
    {
      id: "voting",
      bgcolor: "dodgerBlue",
      label: "Share Units",
      icon: HowToVote,
    },
  ];
  const myStyle = {
    height: 370,
    width: 250,
    boxShadow: "4px 3px gainsboro",
    borderRadius: "15px",
    border: "2px solid white",
    bgcolor: "white",
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Grid
          container
          spacing={1.5}
          sx={{ minHeight: "100%" }}
          marginTop="70px"
        >
          {activityTypes.map((activityType, index) => (
            <Grid
              sx={{ marginRight: "-50px" }}
              item
              xl={3}
              md={6}
              lg={4}
              sm={6}
              xs={5.5}
              align="center"
              key={index}
            >
              <Box
                sx={[{ cursor: "pointer" }, myStyle]}
                onClick={() => {
                  navigate(`${activityType.id}`);
                }}
              >
                <Box
                  sx={{
                    height: myStyle.height / 2,
                    width: myStyle.width,
                    borderRadius: myStyle.borderRadius,
                  }}
                  bgcolor={activityType.bgcolor}
                >
                  <activityType.icon
                    style={{
                      fontSize: "80px",
                      borderRadius: "50px",
                      marginTop: "130px",
                      background: "DarkSlateGrey",
                      fill: "white",
                      padding: "10px",
                    }}
                  />
                </Box>
                <Typography
                  width={"80%"}
                  variant="h4"
                  sx={{ marginTop: "40px" }}
                >
                  {activityType.label}
                </Typography>
              </Box>
            </Grid>
          ))}
          {
            // if activity types is odd number, we need to add an extra grid when the card is displayed two by two
            // so that the card seems to be aligned to the left
            activityTypes.length % 2 === 0 || (
              <Grid item lg={0} sm={6} xs={0}></Grid>
            )
          }
        </Grid>
      </div>
    </>
  );
};
