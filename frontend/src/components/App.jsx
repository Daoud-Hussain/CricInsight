import Login from './Login';
import Register from './Register';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import OldDashboard from './OldDashboard';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';

function App() {

  return (
    <div style={{marginTop : '-3.5rem'}}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element ={<LandingPage/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/old-dashboard" element ={<OldDashboard/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/landing" element ={<LandingPage/>} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
