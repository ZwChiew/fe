import { Grid } from "@mui/material";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Strata1 from "../dataset/Strata-Management-Act-757-English.pdf";
import Strata2 from "../dataset/Akta757_Pengurusan_Strata.pdf";
import { useNavigate } from "react-router-dom";

//const newplugin = defaultLayoutPlugin();
export const ViewPdfEng = () => {
  let navigate = useNavigate();
  const newplugin = defaultLayoutPlugin();
  return (
    <div style={{ marginTop: "50px" }}>
      <Grid container>
        <Grid item xs={11} sm={11}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={Strata1} plugins={[newplugin]} />
          </Worker>
        </Grid>
      </Grid>
    </div>
  );
};

export const ViewPdfBas = () => {
  let navigate = useNavigate();
  const newplugin = defaultLayoutPlugin();
  return (
    <div style={{ marginTop: "50px" }}>
      <Grid container>
        <Grid item xs={11} sm={11}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={Strata2} plugins={[newplugin]} />
          </Worker>
        </Grid>
      </Grid>
    </div>
  );
};
