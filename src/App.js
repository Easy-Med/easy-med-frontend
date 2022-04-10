import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./easymed/Home";
import Opinions from './easymed/Opinions';

function App() {
  return (
      <Router>
          <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/opinions"} element={<Opinions />} />
          </Routes>
      </Router>
  );
}

export default App;
