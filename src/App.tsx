import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/Helper/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Calendar from './components/Calendar/Calendar';

function App() {

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
         
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              {/* <Route path='/dashboard' element={<ProtectedRoute><Register /></ProtectedRoute>} /> */}
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/calendar' element={<Calendar />} />
            </Routes>
         
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
