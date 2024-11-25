import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import loadingIcon from '../assets/checkingout.png';


const ClientCheckout = () => {
    const navigate = useNavigate();
    const savedCartData = localStorage.getItem('cartData');
    //const cartItems = savedCartData ? JSON.parse(savedCartData) : [];
    console.log(JSON.parse(savedCartData));
  
    useEffect(() => {
      const timer = setTimeout(() => {
        
        navigate('/home');
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [navigate]);
    localStorage.removeItem('cartData');
  
    return (
        <div 
        className="d-flex flex-column justify-content-center align-items-center vh-100"
      >
        <img 
          src={loadingIcon} 
          alt="Loading Icon" 
          style={{ width: '40vw', height: 'auto', marginBottom: '5vw' }}
        />
        <h1 
          className="text-center"
          style={{ fontSize: '6vw', color: 'white', fontWeight: '400' }}
        >
          Order <span style={{ color: '#2B964F' }}>Placed</span>
        </h1>
        <div 
          className="spinner-border text-success mt-4"
          role="status"
          style={{ width: '8vw', height: '8vw', borderWidth: '0.8vw' }}
        />
      </div>
  )
}

export default ClientCheckout