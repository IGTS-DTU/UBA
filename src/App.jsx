import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import WaitingPage from './pages/waiting'
import InputPage from './pages/input'
import ScoreScreen from './pages/score'
import RoundWaiting from './pages/roundWait'
import PersonalScoreUBA from './pages/personalScoreUBA'

function App() {
  return (
    <Router>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/waiting" element={< WaitingPage />} />
        <Route path="/roundWait" element={< RoundWaiting />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/score" element={<ScoreScreen />} />
        <Route path="/result" element={<PersonalScoreUBA />} />
      </Routes>
    </Router>
  )
}

export default App
