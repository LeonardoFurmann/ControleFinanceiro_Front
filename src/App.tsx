import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <main>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </main>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
