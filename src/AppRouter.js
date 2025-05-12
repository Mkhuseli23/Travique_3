import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Fitness from './components/Fitness';
import SmartSuggestions from './components/SmartSuggestions';
import GetStarted from './components/GetStarted'; // Ensure it's imported
import Itinerary from './components/Itinerary';

const AppLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/getstarted', '/login', '/register', '/forgotpassword'];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/suggestions" element={<SmartSuggestions />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </div>

      {showNavbar && <Footer />}
    </div>
  );
};

const AppRouter = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default AppRouter;
