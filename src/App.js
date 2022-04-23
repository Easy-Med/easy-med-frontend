import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import ChooseLoginOption from "./app/auth/login/ChooseLoginOption";
import Register from "./app/auth/register/Register";
import LoginAsDoctor from "./app/auth/login/LoginAsDoctor";
import LoginAsPatient from "./app/auth/login/LoginAsPatient";
import DoctorDashboard from "./easymed/doctor/dashboard/DoctorDashboard";
import DoctorReservedVisits from "./easymed/doctor/DoctorReservedVisits";
import DoctorBookingCalendar from "./easymed/doctor/DoctorBookingCalendar";
import DoctorPrescriptions from "./easymed/doctor/DoctorPrescriptions";
import DoctorReviews from "./easymed/doctor/DoctorReviews";
import DoctorSettings from "./easymed/doctor/DoctorSettings";
import Navbar from "./app/navbar/Navbar";
import PatientReservedVisits from "./easymed/patient/PatientReservedVisits";
import PatientPrescriptions from "./easymed/patient/PatientPrescriptions";
import PatientReviews from "./easymed/patient/PatientReviews";
import PatientSettings from "./easymed/patient/PatientSettings";
import PathNotFound from "./app/error/PathNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<ChooseLoginOption />} />
        <Route path={"/login"} element={<ChooseLoginOption />} />
        <Route path={"/login/doctor"} element={<LoginAsDoctor />} />
        <Route path={"/login/patient"} element={<LoginAsPatient />} />
        <Route path={"/register"} element={<Register />} />

        <Route path={"/doctor/"} element={<Navbar role={"doctor"} />}>
          <Route path={""} element={<DoctorDashboard />} />
          <Route path={"reserved-visits"} element={<DoctorReservedVisits />} />
          <Route
            path={"booking-calendar"}
            element={<DoctorBookingCalendar />}
          />
          <Route path={"prescriptions"} element={<DoctorPrescriptions />} />
          <Route path={"reviews"} element={<DoctorReviews />} />
          <Route path={"settings"} element={<DoctorSettings />} />
        </Route>

        <Route path={"/patient/"} element={<Navbar role={"patient"} />}>
          <Route
            path={""}
            element={<Navigate to={"reserved-visits"} replace />}
          />
          <Route path={"reserved-visits"} element={<PatientReservedVisits />} />
          <Route path={"prescriptions"} element={<PatientPrescriptions />} />
          <Route path={"reviews"} element={<PatientReviews />} />
          <Route path={"settings"} element={<PatientSettings />} />
          <Route path={"*"} element={<PathNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
