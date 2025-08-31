import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/Helper/ProtectedRoute';

function App() {

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <main>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={<ProtectedRoute><Register /></ProtectedRoute>} />
            </Routes>
          </main>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
