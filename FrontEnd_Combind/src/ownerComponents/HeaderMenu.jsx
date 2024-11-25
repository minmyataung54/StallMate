import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import arrow from "../assets/arrow-left.svg"
import search from "../assets/search.svg"
import stallqr from '../assets/stallqr.png'

const HeaderMenu = () => {
    const navigate = useNavigate();
    const [searchVisible, setSearchVisible] = useState(false);
    const [query, setQuery] = useState("");

    const handleBackBtn = () => {
        navigate(-1);
    };

    const handleSearchBtn = () => {
        setSearchVisible(!searchVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Searching for:", query);
        setQuery("");
    };
  return (
    <div className="container-fluid">
            <div
                className="container-fluid d-flex fixed-top justify-content-between align-items-center text-white"
                style={{ height: "20vw", background: "#191A1F", zIndex: 1000, padding:"4vw" }}
            >
                <img
                    src={arrow}
                    alt=""
                    onClick={handleBackBtn}
                />
                <div>
                    <img 
                        src={stallqr} 
                        alt="" 
                        onClick={handleSearchBtn}
                        style={{width:"7vw", marginRight:"5vw"}}
                    />
                    <img 
                        src={search} 
                        alt="" 
                        onClick={handleSearchBtn}
                    />
                </div>
            </div>
            {searchVisible && (
                <div 
                    className="container-fluid" 
                    style={{ 
                        width: '85vw', 
                        marginLeft: 'auto', 
                        marginRight: 'auto', 
                        marginTop: '18vw',  
                    }}
                >
                    <form onSubmit={handleSubmit} className='w-100 d-flex justify-content-between'>
                        <div className="input-group">
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
                                style={{ background: '#0E162C', height: '9vw', border: 'none' }} 
                            />
                        </div>
                    </form>
                </div>
            )}
        </div>
  )
}

export default HeaderMenu
