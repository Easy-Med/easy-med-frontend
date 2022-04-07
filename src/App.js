import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./easymed/Home";
import ChooseLoginOption from "./app/auth/login/ChooseLoginOption";
import Register from "./app/auth/register/Register";
import LoginAsDoctor from "./app/auth/login/LoginAsDoctor";
import LoginAsPatient from "./app/auth/login/LoginAsPatient";

function App() {
  return (
      <Router>
          <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/login"} element={<ChooseLoginOption />} />
              <Route path={"/login/doctor"} element={<LoginAsDoctor />} />
              <Route path={"/login/patient"} element={<LoginAsPatient />} />
              <Route path={"/register"} element={<Register />} />
          </Routes>
      </Router>
  );
}

export default App;
