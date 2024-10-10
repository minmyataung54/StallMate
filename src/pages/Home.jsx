import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState } from 'react';
import pfImg from '../assets/profile.png';

const Home = () => {
  return (
    <div className='container-fluid'>
      <nav className='navbar fixed-top text-white' style={{width:'100%',height:'80px',background:'rgba(0, 0, 0, 0.5)', borderRadius:'16px'}}>
      <div className='container-fluid d-flex justify-content-center align-items-center'>
        <div className="container profile-container d-flex flex-row justify-content-center align-items-center">
          <img src={pfImg} alt="" style={{width:'50px', height:'50px', objectFit:'cover', marginLeft:'1rem'}}/>
          <div className="container d-flex flex-column justify-content-center">
            <p className="mx-2 my-2" style={{fontSize: '1rem',fontWeight:'300'}}>Customer</p>
            <p className="h2 mx-2" style={{fontWeight:'300'}}>John K Square</p>
          </div>
          
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Home;
