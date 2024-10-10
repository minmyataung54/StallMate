import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import signup_img from '../assets/signup_image.png';
import { useState } from 'react';
import fblogo from '../assets/fb-button.png';
import gglogo from '../assets/gg-button.png';
import aplogo from '../assets/apple-button.png'



const Signup = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [countryCode, setCountryCode] = useState('+1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/home');
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Create a JSON object to send to the backend
        const fullNumber = `${countryCode} ${phoneNumber}`; // Combine country code and phone number
        const formData = {
            phoneNo: fullNumber,
            email,
            fullName,
        };

        try {
        const response = await fetch('/api/login', { // Change this URL to your backend endpoint
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Success:', data); // Handle success (e.g., redirect or show a success message)
        } catch (error) {
        console.error('Error:', error); // Handle error
        }
    };

    const countryCodes = [
        { code: '+66', name: 'Thailand' }, 
        { code: '+1', name: 'United States' },
        { code: '+44', name: 'United Kingdom' },
        { code: '+61', name: 'Australia' },
        { code: '+91', name: 'India' },
        { code: '+81', name: 'Japan' },
        { code: '+86', name: 'China' },
        { code: '+84', name: 'Vietnam' },
        { code: '+62', name: 'Indonesia' },
        { code: '+855', name: 'Cambodia' },
        { code: '+60', name: 'Malaysia' },
        { code: '+63', name: 'Philippines' },
        { code: '+65', name: 'Singapore' },
        { code: '+95', name: 'Myanmar' },
    ];

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100 w-100">
            <img src={signup_img} alt="Signup" className="img-fluid mx-auto d-block" 
            style={{width:'252px', height:'234.05px'}}/>
            <p className="display-4 text-white my-4 font-weight-login">Create a New Account</p> 
            <form onSubmit={handleSubmit} className="container mt-4">
                <div className="mb-4">
                    <div className="input-group">
                        <select
                            className="form-control form-select custom-input border-0"
                            style={{ flex: '0 0 100px', height: '60px' }}
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                        >
                            {countryCodes.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name} ({country.code})
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            className="form-control custom-input border-0"
                            style={{ flex: '1', height: '60px' }}
                            id="phone"
                            placeholder="00 000 0000"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        className="form-control form-control-lg custom-input border-0"
                        style={{width:'390px', height:'60px'}}
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control form-control-lg custom-input border-0"
                        style={{width:'390px', height:'60px'}}
                        id="fullName"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                        <input
                            className="form-check-input custom-checkbox"
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label className="form-check-label text-white ms-4" htmlFor="remember">
                            Remember me
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn mb-4 text-white" style={{ width: '390px',height: '60px', background:'#02C543', borderRadius:'33px', fontSize:'15px', fontWeight:'500'}}>
                    Sign Up
                </button>
            </form>
            <div className="container mt-1">
                <div className="d-flex align-items-center justify-content-center mb-3 text-white">
                    <hr className="flex-fill" style={{ border: '1px solid white', margin: '0' }} />
                    <span className="mx-2">or</span>
                    <hr className="flex-fill" style={{ border: '1px solid white', margin: '0' }} />
                </div>
            </div>
            <div className='container d-flex justify-content-center align-items-center mt-1'>
                <button className='btn btn-custom-signup mb-4 mx-4' onClick={handleLogin}>
                    <img src={fblogo} alt="" style={{ height: '30px', width: '30px', alignItems: 'center' }} />
                </button>
                <button className='btn btn-custom-signup mb-4 mx-4' onClick={handleLogin}>
                    <img src={gglogo} alt="" style={{ height: '30px', width: '30px', alignItems: 'center'}} />
                </button>
                <button className='btn btn-custom-signup mb-4 mx-4' onClick={handleLogin}>
                    <img src={aplogo} alt="" style={{ height: '30px', width: '30px', alignItems: 'center' }} />
                </button>
            </div>
            <div className="text-center">
                <p className="text-white">
                    Already have an account? {' '}
                    <a href="/Login" className="text-success">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
