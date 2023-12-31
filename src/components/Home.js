import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import img1 from "../images/pdfBI.png";
import img2 from "../images/pdfBM.png";
import { Box } from "@mui/material";
// TODO remove, this demo shouldn't need to reset the theme.

export const Home = () => {
  let navigate = useNavigate();
  return (
    <Box>
      <Grid sx={{ marginTop: "30px" }} container spacing={5}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            onClick={() => navigate("view_eng")}
            sx={{
              cursor: "pointer",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="div"
              sx={{
                // 16:9
                pt: "56.25%",
              }}
              image={img1}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Strata Management Act 757
              </Typography>
              <Typography>
                This Act governs the responsibilities and obligations of
                property owners, management committees, and property managers in
                maintaining and preserving shared facilities, common areas, and
                overall property value. It aims to ensure the smooth operation
                of strata developments, address disputes, and promote harmonious
                living within these communities.
              </Typography>
            </CardContent>
          </Card>
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            onClick={() => navigate("view_bm")}
            sx={{
              cursor: "pointer",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="div"
              sx={{
                // 16:9
                pt: "56.25%",
              }}
              image={img2}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Akta 757 Pergurusan Strata
              </Typography>
              <Typography>
                Akta ini mengawal tanggungjawab dan kewajipan pemilik hartanah,
                jawatankuasa pengurusan, dan pengurus hartanah dalam menjaga dan
                memelihara kemudahan berkongsi, kawasan-kawasan biasa, dan nilai
                hartanah secara keseluruhan. Ia bertujuan untuk memastikan
                operasi yang lancar bagi pembangunan strata dan menangani
                perselisihan
              </Typography>
            </CardContent>
          </Card>
        </Grid>{" "}
      </Grid>
    </Box>
  );
};
