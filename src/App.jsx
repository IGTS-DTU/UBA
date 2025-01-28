import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import WaitingPage from './pages/waiting'
import InputPage from './pages/input'
function App() {
  return (
    <Router>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/waiting" element={< WaitingPage />} />
        <Route path="/input" element={<InputPage />} />
      </Routes>
    </Router>
  )
}

export default App
