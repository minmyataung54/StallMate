// React
import React from 'react';

// Assets
import loadingIcon from './assets/checkingout.png';
import stallIcon from './assets/stall.png';
import userIcon from './assets/person.png';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './RoleSelect.css';

const RoleSelect = ({ onRoleSelect }) => {
  	return (
    	<div className="role-select-container">
      		<img
        		src={loadingIcon}
        		alt="Loading Icon"
        		className="loading-icon"
      		/>
      		<h1 className="app-title">
        		Stall<span className="highlighted">Mate</span>
      		</h1>

      		<CustomButton
        		icon={userIcon}
        		label="Login as user"
        		onClick={() => onRoleSelect("Customer")}
      		/>

      		<div className="separator">
        		<hr className="separator-line" />
        		<p className="separator-text">or</p>
        		<hr className="separator-line" />
      		</div>

      		<CustomButton
        		icon={stallIcon}
        		label="Login as stall owner"
        		onClick={() => onRoleSelect("StallOwner")}
      		/>
    	</div>
  	);
};

const CustomButton = ({ icon, label, onClick }) => (
	<button className="custom-button" onClick={onClick}>
    	<div className="button-content">
      		<img src={icon} alt={label} className="button-icon" />
      		<p className="button-text">{label}</p>
    	</div>
  	</button>
);

export default RoleSelect;