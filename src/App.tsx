import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login/Login';

function App() {

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <main>
            <Routes>
              <Route path='/' element={<Login />} />
            </Routes>
          </main>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
