import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import {
  LinkedIn,
  Facebook,
  Language,
  Phone,
  Email,
  AddLocation,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Typography, Divider, Paper, Link, Stack } from "@mui/material";

// import { db } from "../firebase-config";
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { useEffect, useState } from "react";

// export const AboutPage = () => {
//   const [rules, setRules] = useState([]);
//   const ruleCollectionRef = collection(db, "rules");
//   useEffect(() => {
//     const getRules = async () => {
//       const data = await getDocs(ruleCollectionRef);
//       console.log(data.docs[0].data());
//       // setRules(
//       //   data.docs.map((doc) => ({
//       //     ...doc.data(),
//       //     id: doc.id,
//       //   }))
//       // );
//     };
//     getRules();
//   }, []);

//   return <>Hello World</>;
// };

export const AboutPage = () => {
  const sidebar = {
    title: "Our services",
    archives: [
      { title: "03-2779 1663", icon: Phone },
      { title: "info@odesi.tech", icon: Email },
      {
        title:
          "B-07, 02, Jalan PJU 1A/7, Oasis Ara Damansara, 47301 Petaling Jaya, Selangor",
        icon: AddLocation,
      },
    ],
    social: [
      {
        name: "Official Website",
        icon: Language,
        url: "https://odesi.tech/",
      },
      {
        name: "Linkedin",
        icon: LinkedIn,
        url: "https://www.linkedin.com/company/odesii-malaysia/",
      },
      {
        name: "Facebook",
        icon: Facebook,
        url: "https://www.facebook.com/ODESII/",
      },
    ],
  };

  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Grid container spacing={5} sx={{ mt: 6 }}>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              "& .markdown": {
                py: 3,
              },
            }}
          >
            <Typography
              sx={{ marginBottom: "10px", color: "Dodgerblue" }}
              variant="h3"
              gutterBottom
            >
              About Our System
            </Typography>
            <Divider />

            <Typography sx={{ marginTop: "40px" }} variant="h5">
              Welcome to our Strata Expert System, your go-to resource for all
              things related to strata management and strata-related questions.
              Our system combines the knowledge of frequently asked questions
              (FAQs) with the intricacies of the Strata Management Act to
              provide you with expert guidance.
            </Typography>
            <Typography
              sx={{ marginTop: "50px", color: "dodgerblue" }}
              variant="h3"
              gutterBottom
            >
              Our Mission
            </Typography>
            <Divider />

            <Typography sx={{ marginTop: "40px" }} variant="h5">
              Our aim is to provide timely responses while maintaining the
              precision and expertise of a real-world strata expert. We
              understand the complexities of strata management, and we're here
              to simplify them for you. With our Strata Expert System, you have
              a reliable partner in navigating the intricate world of strata.
              Whether you're seeking information, guidance, or calculations,
              we're here to assist you every step of the way.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
              <Typography variant="h5" gutterBottom>
                {sidebar.title}
              </Typography>
              <Typography variant="body">
                {" "}
                <div>
                  &#x2022; Comprehensive Strata Answers
                  <br />
                  &#x2022; Interactive PDF Chat
                  <br />
                  &#x2022; Share Unit Allocation
                  <br />
                  &#x2022; Fees Estimations
                  <br />
                  &#x2022; Scalable Knowledge Base
                </div>
              </Typography>
            </Paper>
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
              Contact Us
            </Typography>
            {sidebar.archives.map((archive, index) => (
              <Grid container key={`${archive.title}-${index}-${archive.icon}`}>
                <Grid item sm={2} xs={2} lg={1}>
                  <archive.icon style={{ color: "dodgerblue" }} />{" "}
                </Grid>
                <Grid alignContent="left" item sm={8} xs={8}>
                  <Typography
                    display="block"
                    variant="body1"
                    key={archive.title}
                  >
                    {archive.title}
                  </Typography>
                </Grid>
              </Grid>
            ))}
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
              Social
            </Typography>
            {sidebar.social.map((network, map) => (
              <Link
                display="block"
                variant="body1"
                href={network.url}
                key={`${network.url}`}
                sx={{ mb: 0.5 }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <network.icon />
                  <span>{network.name}</span>
                </Stack>
              </Link>
            ))}
          </Grid>
        </Grid>
        <Button
          size="large"
          sx={{ marginTop: "50px" }}
          variant="contained"
          color="primary"
          onClick={() =>
            window.open("https://forms.gle/2kf7wXXU1T8FC2NY9", "_blank")
          }
        >
          Provide Feedback
        </Button>
      </main>
    </ThemeProvider>
  );
};
