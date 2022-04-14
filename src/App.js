import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./easymed/Home";
import Settings from './easymed/Settings';

function App() {
  return (
      <Router>
          <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/settings"} element={<Settings/>} />
                    
          </Routes>
      </Router>
  );
}

export default App;
