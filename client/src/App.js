import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Resgesteroftilent from "./pages/resgesteroftilent/Resgesteroftilent";
import RegesterCompany from "./pages/regesterCompany/RegesterCompany";
import Forgot from "./pages/forgot/Forgot";
import SingIn from "./pages/Sign In/SingIn";
import ChangePasswred from "./pages/ChangePasswred/ChangePasswred";
import SignUp from "./pages/SignUp/SignUp";
import AdminRoute from "./utils/customRouter/AdminRoute";
import NotAuthentication from "./utils/customRouter/NotAuthentication";
import Authentication from "./utils/customRouter/Authentication";
import UpDateUser from "./pages/UpDateUser/UpDateUser";
import Text from "./pages/Text/Text";
import SettingPages from "./pages/SettingPages/SettingPages";
import AddJob from "./pages/AddJob/AddJob";
import CompanyRoute from "./utils/customRouter/CompanyRoute";
import TalenRoute from "./utils/customRouter/TalenRoute";
import AllJobs from "./components/All Jobs/AllJobs";
import NotFound from "./components/NotFound/NotFound";
import JobsAdmin from "./pages/Jobs/JobsAdmin";
import AJobByAdmin from "./pages/AJobByAdmin/AJobByAdmin";
import Redirect from "./pages/Redirect";
import Test from "./pages/test/Test";
import AJobDetalesForCompany from "./pages/AJobDetalesForCompany/AJobDetalesForCompany";
import JobsTalent from "./pages/JobsTalent/JobsTalent";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/Redirect" element={<Redirect />} />

        <Route element={<NotAuthentication />}>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/CompanySignUp" element={<RegesterCompany />} />
          <Route path="/TalentSignUp" element={<Resgesteroftilent />} />
          <Route path="/SingIn" element={<SingIn />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/changePassword/:token" element={<ChangePasswred />} />
        </Route>

        <Route element={<Authentication />}>
          <Route path="/UpDateUser" element={<UpDateUser />} />
          <Route path="/SettingPages" element={<SettingPages />} />
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<CompanyRoute />}>
          <Route path="/addJob" element={<AddJob />} />
          <Route path="/AllJobs" element={<AllJobs />} />
          <Route
            path="/AJobDetalesForCompany/:id"
            element={<AJobDetalesForCompany />}
          />
        </Route>

        <Route element={<TalenRoute />}>
          <Route path="/Text" element={<Test />} />
          <Route path="/jobsTalent" element={<JobsTalent />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/JobsAdmin" element={<JobsAdmin />} />
          <Route path="/AJobByAdmin/:id" element={<AJobByAdmin />} />
        </Route>

        <Route path="/github/callback" element={<Text />}></Route>
      </Routes>
    </div>
  );
}

export default App;
