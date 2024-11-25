import React from 'react';
import loadingIcon from './assets/checkingout.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderPlacedLoading.css';

const OrderPlacedLoading = () => {
	return (
		<div className="loading-container">
			<img 
				src={loadingIcon} 
				alt="Loading Icon" 
				className="loading-icon"
			/>
			<h1 
				className="text-center" 
				style={{ fontSize: '6vw', color: 'white', fontWeight: '400' }}>
				Order <span style={{ color: '#2B964F' }}> Placed </span>
      		</h1>
			<div 
				className="spinner-border text-success loading-spinner" 
				role="status" aria-label="Loading" 
				style={{ marginTop: '10vw' }}
			/>	
		</div>
	);
};

export default OrderPlacedLoading;