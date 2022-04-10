import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./easymed/Home";
import Patient from './easymed/Patient';

function App() {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/patient"} element={<Patient />} />
            </Routes>
        </Router>
    );
}

export default App;
