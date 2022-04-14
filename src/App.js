import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChooseLoginOption from "./app/auth/login/ChooseLoginOption";
import Register from "./app/auth/register/Register";
import LoginAsDoctor from "./app/auth/login/LoginAsDoctor";
import LoginAsPatient from "./app/auth/login/LoginAsPatient";
import DoctorDashboard from "./easymed/doctor/DoctorDashboard";
import DoctorReservedVisits from "./easymed/doctor/DoctorReservedVisits";
import DoctorBookingCalendar from "./easymed/doctor/DoctorBookingCalendar";
import DoctorPrescriptions from "./easymed/doctor/DoctorPrescriptions";
import DoctorReviews from "./easymed/doctor/DoctorReviews";
import DoctorSettings from "./easymed/doctor/DoctorSettings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<DoctorDashboard />} />
        <Route path={"/login"} element={<ChooseLoginOption />} />
        <Route path={"/login/doctor"} element={<LoginAsDoctor />} />
        <Route path={"/login/patient"} element={<LoginAsPatient />} />
        <Route path={"/register"} element={<Register />} />

        <Route path={"/doctor"} element={<DoctorDashboard />} />
        <Route path={"/doctor/reserved-visits"} element={<DoctorReservedVisits />} />
        <Route path={"/doctor/booking-calendar"} element={<DoctorBookingCalendar />} />
        <Route path={"/doctor/prescriptions"} element={<DoctorPrescriptions />} />
        <Route path={"/doctor/reviews"} element={<DoctorReviews />} />
        <Route path={"/doctor/settings"} element={<DoctorSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
