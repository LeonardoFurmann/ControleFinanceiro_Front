import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home/Home';

function App() {

  return (
    <div>
      <BrowserRouter>
        <main>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </AuthProvider>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
