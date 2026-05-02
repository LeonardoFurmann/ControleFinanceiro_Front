import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProtectedRoute from "./components/Helper/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Calendar from "./pages/Calendar/CalendarPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/Theme/ThemeToggle";

function App() {
  return (
    <ThemeProvider>
      <div>
        <BrowserRouter>
          <AuthProvider>
            <ThemeToggle />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
            </Route>
          </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
