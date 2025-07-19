import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';


function App() {

  return (
    <div>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
