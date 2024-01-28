
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './pages/home';
import CampGround from './pages/campground';

function App() {
  return (
    <div>
    <Router>
    <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="/campground/:id"  element={<CampGround />} />
      {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  </div>
 );

}

export default App;
