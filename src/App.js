import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import Fitness from './components/Fitness';
import SmartSuggestions from './components/SmartSuggestions';
import Weather from './components/Weather';
import TripPlanner from './components/TripPlanner';
import FoodFinder from './components/FoodFinder';
import HealthTips from './components/HealthTips';
import Expenses from './components/Expenses';
import ErrorBoundary from './components/ErrorBoundary';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Layout() {
  const location = useLocation();

  // Navbar removed entirely
  return (
    <>
      <ScrollToTop />
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <ErrorBoundary />,
        children: [
          { path: "fitness", element: <Fitness /> },
          { path: "suggestions", element: <SmartSuggestions /> },
          { path: "weather", element: <Weather /> },
          { path: "trip-planner", element: <TripPlanner /> },
          { path: "food-finder", element: <FoodFinder /> },
          { path: "health-tips", element: <HealthTips /> },
          { path: "expenses", element: <Expenses /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
