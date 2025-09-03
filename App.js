import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Common pages
import LandingPage from "./components/LandingPage";
import RolePage from "./components/RolePage";
import Userlogin from "./components/Userlogin";
import CreateAccount from "./components/CreateAccount";
import Adminlogin from "./components/Adminlogin";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";




// Admin pages
import AdminSettingsUI from "./components/Admin/AdminSettings";
import Form from "./components/Admin/Form";
import Details from "./components/Admin/Details";
import ReportsPage from "./pages/ReportsPage";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ReportAccess from "./pages/ReportAccess";
import Admindashboardsettings from "./components/Admin/Admindashboardsettings";
import Adminhelp from "./components/Admin/Adminhelp";
import Adminaccount from "./components/Admin/Adminaccount";
import AdminFileManager from "./components/Admin/AdminFileManager";
import AddFiles from "./components/Admin/AddFiles";


// ✅ User pages (wrapped inside UserLayout)
import UserLayout from "./components/User/UserLayout";
import UserDashboard from "./components/User/UserDashboard";
import UserProfile from "./components/User/UserProfile";
import UserSettings from "./components/User/UserSettings";
import AllReports from "./components/User/AllReports";
import Bookmarks from "./components/User/Bookmarks";
import Help from "./components/User/Help";

import Users from "./components/User/User";
import AddFilesNotifications from "./components/Admin/AddFilesNotifications";

function App() {
  const [data, setData] = useState([]);
const [reports, setReports] = useState([
  { id: 1, name: "AML Report Q1", category: "AML Reports", fileType: "PDF", bookmarked: false },
  { id: 2, name: "Risk Report 2024", category: "Risk Reports", fileType: "Excel", bookmarked: true },
  { id: 3, name: "Customer Profile", category: "Customer Reports", fileType: "DOCX", bookmarked: false }
]);
  return (
    <>
    {/* <div>
      <h1>Frontend + Backend Integration 🎉</h1>
      <Users />  👈 show Users component 
      </div>*/}

    <Router>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/role-selection" element={<RolePage />} />
          <Route path="/Userlogin" element={<Userlogin />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/Adminlogin" element={<Adminlogin />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />

          


          {/* Admin pages */}
          <Route path="/AdminUser" element={<Form data={data} setData={setData} />} />
          <Route path="/details" element={<Details data={data} setData={setData} />} />
          <Route path="/settings" element={<AdminSettingsUI />} />
          <Route path="/Reports" element={<ReportsPage />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/ReportAccess" element={<ReportAccess />} />
          <Route path="/Admindashboardsettings" element={<Admindashboardsettings />} />
          <Route path="/Adminaccount" element={<Adminaccount />} />
          <Route path="/Adminhelp" element={<Adminhelp />} />
          <Route path="/AdminFileManager" element={<AdminFileManager users={data} />} />
          <Route path="/AddFiles" element={<AddFiles users={data} />} />
          <Route path="/AddFilesNotifications" element={<AddFilesNotifications/>} />


          {/* ✅ User pages (all inside UserLayout) */}
          <Route
            path="/UserDashboard"
            element={<UserLayout>
              <UserDashboard />
            </UserLayout>} />
          <Route
            path="/UserSettings"
            element={<UserLayout>
              <UserSettings />
            </UserLayout>} />
          <Route
            path="/UserProfile"
            element={<UserLayout>
              <UserProfile />
            </UserLayout>} />
          <Route
            path="/AllReports"
            element={<UserLayout>
              <AllReports reports={reports} setReports={setReports} />
            </UserLayout>} />

          <Route
            path="/Bookmarks"
            element={<UserLayout>
              <Bookmarks reports={reports} setReports={setReports} />
            </UserLayout>} />
          <Route
            path="/Help"
            element={<UserLayout>
              <Help />
            </UserLayout>} />
        </Routes>
      </Router></>
    
  );
}

export default App;
