import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import pfImg from '../assets/profile.png';
import ntImg from '../assets/bell.png';
import offBurg from '../assets/off_burg.jpg';
import nearMe from '../assets/near.png';
import burg from '../assets/hambur.png';
import pizz from '../assets/pizza.png';
import nood from '../assets/nood.png';
import chic from '../assets/chic.png';
import vege from '../assets/spoonFork.png';
import cake from '../assets/cake.png';
import others from '../assets/kanom.png';
import './Home.css'; 
const Home = () => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search Query:', query);
    setQuery('');
  };

  return (
    <div className='container-fluid'>
      
      <div className='container-fluid fixed-top d-flex justify-content-center align-items-center text-white' 
           style={{ width: '100vw', height: '18.6vw', background: '#191A1F', zIndex: 1000 }} 
      >
        <div className='container d-flex justify-content-center align-items-center'>
          <div className="profile-container d-flex flex-row justify-content-around align-items-center">
            <img src={pfImg} alt="" 
                 style={{ width: '11.6vw', height: '11.6vw', objectFit: 'cover', marginLeft: '1.5vw' }} 
            />
            <div className="d-flex flex-column justify-content-center">
              <p className="mx-2 my-2" style={{ fontSize: '2.3vw', fontWeight: '300' }}>Customer</p> 
              <p className="h3 mx-2" style={{ fontWeight: '300', fontSize: '3.7vw' }}>John K Square</p> 
            </div>
            <img src={ntImg} alt="" 
                 style={{ width: '7vw', height: '7vw', filter: 'invert(1)', marginLeft: '30vw' }} 
            />
          </div>
        </div>
      </div>

      <div style={{ height: '10vw' }}></div> 

      <div className="container mt-4" style={{ width: '85vw', marginLeft: 'auto', marginRight: 'auto' }}>
        <form onSubmit={handleSubmit} className='w-100 d-flex justify-content-between'>
            <div className="input-group mb-3 w-100">
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
                style={{ background: '#0E162C', height: '3.125rem', border: 'none' }} 
            />
            </div>
        </form>
      </div>

      <div className="container d-flex justify-content-between mt-3">
          <p className='text-white'>Special offers</p>
          <a className='text-success' href="">See more...</a>
      </div>


      <div className="container d-flex justify-content-center align-items-center my-3">
          <button 
              style={{
                  width: '90.7vw',         
                  height: '50vw',          
                  borderRadius: '20%',      
                  overflow: 'hidden',      
                  border: 'none',         
                  padding: '0',            
              }}
          >
              <img 
                  src={offBurg} 
                  alt="" 
                  style={{
                      width: '100%',          
                      height: '100%',         
                      borderRadius:'20%'     
                  }}
              />
          </button>
      </div>

    
      <div className="row d-flex justify-content-center">
          {[
            { img: nearMe, label: 'Near Me' },
            { img: burg, label: 'Burger' },
            { img: pizz, label: 'Pizza' },
            { img: nood, label: 'Noodle' },
            { img: chic, label: 'Chicken' },
            { img: vege, label: 'Vegetable' },
            { img: cake, label: 'Cake' },
            { img: others, label: 'Others' }
          ].map((item, index) => (
            <div key={index} className="col-3 d-flex flex-column align-items-center mb-n1">
                <button style={{ background: 'transparent', border: 'none', textAlign: 'center' }}>
                    <img src={item.img} alt={item.label} style={{ width: '9.3vw', height: 'auto' }} />
                    <p style={{ fontWeight: '100', fontSize: '3vw', marginTop: '1vw' }}>{item.label}</p>
                </button>
            </div>
          ))}
      </div>

      <div className="container d-flex justify-content-between mt-3">
          <p className='text-white'>Weekly Special</p>
          <a className='text-success' href="">See all</a>
      </div>
    </div>
  );
};

export default Home;
