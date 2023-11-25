import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { VotingCal } from "./components/VotingCal";
import { SinkingCal } from "./components/SinkingCal";
import { MaintenanceCal } from "./components/MaintenanceCal";
import { Activities } from "./components/Activities";
import { AboutPage } from "./components/About";
import PersistentDrawerLeft from "./SideBar";
import { LoadingOverlay } from "./components/Loading-overlay";
import { SigninPage } from "./components/Signin";
import { ES } from "./components/ES";
import { ViewPdfBas, ViewPdfEng } from "./components/ViewPdf";
import { EditFormUser } from "./components/UsersEditForm";
import { Users } from "./components/Users";
import { KBMS } from "./components/KMBS";
import { EditFormRule } from "./components/RuleEditForm";

export const Routers = () => {
  return (
    <BrowserRouter>
      <LoadingOverlay />
      <PersistentDrawerLeft>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/calculators" element={<Activities />} />
          <Route path="/calculators/voting" element={<VotingCal />} />
          <Route path="/calculators/sinking_fees" element={<SinkingCal />} />
          <Route
            path="/calculators/maintenance_fees"
            element={<MaintenanceCal />}
          />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/chatbot" element={<ES />} />
          <Route path="/users" element={<Users />} />
          <Route path="/KBMS" element={<KBMS />} />
          <Route path="/home/view_bm" element={<ViewPdfBas />} />
          <Route path="/home/view_eng" element={<ViewPdfEng />} />
          <Route path="users/editUser" element={<EditFormUser />} />
          <Route path="KBMS/editRule" element={<EditFormRule />} />
        </Routes>
      </PersistentDrawerLeft>
    </BrowserRouter>
  );
};
