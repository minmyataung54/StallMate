import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import loadingIcon from './assets/checkingout.png';
import './Loading.css';

const Loading = () => {
	return (
		<div className="loading-container">
			<img
				src={loadingIcon}
				alt="Loading Icon"
				className="loading-icon"
			/>
			<div
				className="spinner-border text-success loading-spinner"
				role="status"
				aria-label="Loading"
			/>
		</div>
	);
};

export default Loading;
