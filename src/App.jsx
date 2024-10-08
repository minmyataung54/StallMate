import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './App.css'
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
          element={isLoggedIn ? <HomeWithNavbar /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  )
}

function HomeWithNavbar() {
  return(
    <>
      <Home />
      <Navbar />
    </>
  );
}

export default App
