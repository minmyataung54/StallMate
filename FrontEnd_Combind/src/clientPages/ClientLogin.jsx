import React from 'react';
import LoginPicture from '../assets/login_img.png';
import GoogleLogo from '../assets/gg-button.png';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './ClientLogin.css';

const ClientLogin = () => {
    const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL;
    const BACK_FRONT_BASE_URL = import.meta.env.VITE_API_FRONT_END_BASE_URL;

    const HandleGoogleLogin = () => {
        // console.log("Google login clicked");
        window.location.href = `${BACK_END_BASE_URL}/auth/customer/google?redirectTo=${BACK_FRONT_BASE_URL}/clientHome`;
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100 p-0 m-0">
            <div style={{marginTop:"45vw"}}></div>    
                <img 
                    src={LoginPicture} 
                    alt="" 
                    className="img-fluid mx-auto d-flex" 
                    style={{ width: '80vw', height: '70vw' }} 
                />
                <p className="display-1 text-white my-4 font-weight-login" style={{ fontSize: '8vw' }}>Let's You In</p>
                <div className="card-body d-flex flex-column">
                    <button
                        className="btn mb-4 text-white" 
                        style={{ width: '90vw', height: '14vw', background: '#01040F', borderRadius: '2.8vw', fontSize: '3.5vw', fontWeight: '500' }}
                        onClick={HandleGoogleLogin}
                    >
                        <img 
                            src={GoogleLogo} 
                            alt="" 
                            style={{ width: '6.9vw', height: '6.9vw', marginRight: '3.5vw', alignItems: 'center' }} />
                        Continue with Google
                    </button>
                </div>
        </div>
    );
};

export default ClientLogin;