import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import ChooseSignInOption from "./app/auth/signIn/ChooseSignInOption";
import SignUp from "./app/auth/signUp/SignUp";
import SignInAsDoctor from "./app/auth/signIn/SignInAsDoctor";
import SignInAsPatient from "./app/auth/signIn/SignInAsPatient";
import DoctorReservedVisits from "./easymed/doctor/DoctorReservedVisits";
import DoctorBookingCalendar from "./easymed/doctor/bookingCalendar/DoctorBookingCalendar";
import DoctorPrescriptions from "./easymed/doctor/DoctorPrescriptions";
import DoctorReviews from "./easymed/doctor/DoctorReviews";
import DoctorSettings from "./easymed/doctor/settings/DoctorSettings";
import Navbar from "./app/navbar/Navbar";
import PatientReservedVisits from "./easymed/patient/PatientReservedVisits";
import PatientPrescriptions from "./easymed/patient/prescriptions/PatientPrescriptions";
import PatientReviews from "./easymed/patient/PatientReviews";
import PatientSettings from "./easymed/patient/settings/PatientSettings";
import PathNotFound from "./app/error/PathNotFound";
import AuthProvider from "./app/auth/AuthProvider";
import Home from "./easymed/Home";
import RequireAuth from "./app/auth/RequireAuth";
import DoctorDashboard from "./easymed/doctor/dashboard/DoctorDashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/signIn"} element={<ChooseSignInOption />} />
          <Route path={"/signIn/doctor"} element={<SignInAsDoctor />} />
          <Route path={"/signIn/patient"} element={<SignInAsPatient />} />
          <Route path={"/signUp"} element={<SignUp />} />

          <Route
            path={"/doctor/"}
            element={
              <RequireAuth role={"doctor"}>
                <Navbar />
              </RequireAuth>
            }
          >
            <Route path={""} element={<DoctorDashboard />} />
            <Route
              path={"reserved-visits"}
              element={<DoctorReservedVisits />}
            />
            <Route
              path={"booking-calendar"}
              element={<DoctorBookingCalendar />}
            />
            <Route path={"prescriptions"} element={<DoctorPrescriptions />} />
            <Route path={"reviews"} element={<DoctorReviews />} />
            <Route path={"settings"} element={<DoctorSettings />} />
            <Route path={"*"} element={<PathNotFound />} />
          </Route>

          <Route
            path={"/patient/"}
            element={
              <RequireAuth role={"patient"}>
                <Navbar />
              </RequireAuth>
            }
          >
            <Route
              path={""}
              element={<Navigate to={"reserved-visits"} replace />}
            />
            <Route
              path={"reserved-visits"}
              element={<PatientReservedVisits />}
            />
            <Route path={"prescriptions"} element={<PatientPrescriptions />} />
            <Route path={"reviews"} element={<PatientReviews />} />
            <Route path={"settings"} element={<PatientSettings />} />
            <Route path={"*"} element={<PathNotFound />} />
          </Route>

          <Route path={"*"} element={<PathNotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
