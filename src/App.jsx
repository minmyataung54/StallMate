import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Qrcode from './pages/Qrcode';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
import Wallet from './pages/Wallet';
import Navbar from './components/Navbar';
import NearMe from './pages/NearMe';
import ResNMenu from './pages/ResNMenu';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const isLoggedIn = true; 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route 
          path="/home" 
          element={isLoggedIn ? <HomeWithNavbar component={<Home />} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/qr" 
          element={isLoggedIn ? <HomeWithNavbar component={<Qrcode />} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={isLoggedIn ? <HomeWithNavbar component={<Profile />} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/setting" 
          element={isLoggedIn ? <HomeWithNavbar component={<Setting />} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/wallet" 
          element={isLoggedIn ? <HomeWithNavbar component={<Wallet />} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/nearme" 
          element={isLoggedIn ? <NearMe /> : <Navigate to='/login' />} 
        />
        <Route 
          path="/resnmenu/:restaurantName" 
          element={isLoggedIn ? <ResNMenu /> : <Navigate to='/login' />} 
        />
      </Routes>
    </Router>
  );
}

function HomeWithNavbar({ component }) {
  const [activeIcon, setActiveIcon] = useState('home');

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };

  return (
    <>
      {component}
      <Navbar activeIcon={activeIcon} onIconClick={handleIconClick} />
    </>
  );
}

export default App;
