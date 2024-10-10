import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState } from 'react';
import pfImg from '../assets/profile.png';
import ntImg from '../assets/bell.png';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Home = () => {
  const [query, setQuery] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search Query:', query);
    setQuery('');
  }
  return (
    <div className='container-fluid'>
    <div className='container-fluid fixed-top d-flex justify-content-center align-items-center text-white' style={{width:'auto',height:'80px',background:'#191A1F'}}>
        <div className='container-fluid d-flex justify-content-center align-items-center '>
            <div className="container profile-container d-flex flex-row justify-content-center align-items-center">
                <img src={pfImg} alt="" style={{width:'50px', height:'50px', objectFit:'cover', marginLeft:'1rem'}}/>
                <div className="container d-flex flex-column justify-content-center">
                    <p className="mx-2 my-2" style={{fontSize: '1rem',fontWeight:'300'}}>Customer</p>
                    <p className="h3 mx-2" style={{fontWeight:'300'}}>John K Square</p>
                </div>
                <div className="container d-flex flex-column justify-content-center">
                    <img src={ntImg} alt="" style={{width:'30px', height:'30px', filter:'invert(1)', marginLeft:'11rem'}}/>
                </div>
            </div>
        </div>
    </div>
    <div className="container mt-5" style={{ paddingTop: '2rem', width: '30rem', height: '3.125rem', boxSizing: 'border-box' }}>
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text" style={{ background: '#0E162C', border: 'none' }}>
                  <i className="bi bi-search" style={{ color: 'white' }}></i>
                </span>
                <input
                    type="text"
                    className="form-control custom-placeholder"
                    placeholder="Search your interesting foods or restaurants..."
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                    style={{background:'#0E162C',height: '3.125rem', border:'none'}}
                />
            </div>
        </form>
    </div>
  </div>

  );
};

export default Home;
