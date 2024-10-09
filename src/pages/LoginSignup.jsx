import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './LoginSignup.css';
import loginpic from '../assets/login_img.png';
import fblogo from '../assets/fb-button.png';
import gglogo from '../assets/gg-button.png';
import aplogo from '../assets/apple-button.png'

const LoginSignup = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/home');
    };

    const handleGoogleLogin = () => {
        console.log("Google login clicked");
        handleLogin(); 
    };

    const handleFacebookLogin = () => {
        console.log("Facebook login clicked");
        handleLogin(); 
    };

    const handleAppleLogin = () => {
        console.log("Apple login clicked");
        handleLogin(); 
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100 p-0 m-0">
            <img src={loginpic} alt="" className="img-fluid my-4 mx-auto d-flex" style={{width:'348.74px', height:'302'}} />
            <p className="display-1 text-white my-4 font-weight-login">Let’s You In</p>
                <div className="card-body">
                    <button
                        className="btn mb-4 text-white" style={{ width: '390px',height: '60px', background: '#01040F', borderRadius:'12px', fontSize:'15px', fontWeight:'500' }}
                        onClick={handleFacebookLogin}
                    >
                        <img src={fblogo} alt="" style={{ width: '30px',height: '30px', marginRight: '15px', alignItems: 'center' }} />
                        Continue with Facebook
                    </button>
                    <button
                        className="btn mb-4 text-white" style={{ width: '390px',height: '60px', background: '#01040F', borderRadius:'12px', fontSize:'15px', fontWeight:'500' }}
                        onClick={handleGoogleLogin}
                    >
                        <img src={gglogo} alt="" style={{ width: '30px',height: '30px', marginRight: '15px' , alignItems: 'center' }} />
                        Continue with Google
                    </button>
                    <button
                        className="btn mb-4 text-white" style={{ width: '390px',height: '60px', background: '#01040F', borderRadius:'12px', fontSize:'15px', fontWeight:'500' }}
                        onClick={handleAppleLogin}
                    >
                        <img src={aplogo} alt="" style={{ width: '30px',height: '30px', marginRight: '15px' , alignItems: 'center' }} />
                        Continue with Apple
                    </button>
                    <div className="d-flex align-items-center text-center mb-3 text-white">
                        <hr className='flex-fill' style={{ borderColor: 'white'}}/>
                        <span className='mx-2'>or</span>
                        <hr className='flex-fill' style={{ borderColor: 'white'}}/>
                    </div>
                    <button className="btn mb-4 text-white" style={{ width: '390px',height: '60px', background:'#02C543', borderRadius:'33px', fontSize:'15px', fontWeight:'500' }} onClick={handleLogin}>
                        Sign in with Contact Number
                    </button>
                    <div className="text-center">
                        <p className="text-white">
                            Create an account {' > '}
                            <a href="/signup" className="text-success">Sign Up</a>
                        </p>
                    </div>
                </div>
        </div>
    );
};

export default LoginSignup;
