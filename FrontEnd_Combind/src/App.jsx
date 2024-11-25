import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CheckoutForm, Return } from './StripeTest';

{/* Public components */}
import RoleSelect from '../src/RoleSelect';

{/* Client pages */}
import ClientLogin from './clientPages/ClientLogin';
import ClientHome from './clientPages/ClientHome';
import ClientProfile from './clientPages/ClientProfile';
import ClientEditProfile from './clientPages/ClientEditProfile';
import ClientWallet from './clientPages/ClientWallet';
import ClientNavBar from './clientComponents/ClientNavBar';
import ResNMenu from './clientPages/ResNMenu';
import Loading from './Loading';
import ClientFavourite from './clientPages/ClientFavourite';

{/* Owner pages */}
import OwnerLogin from './ownerPages/OwnerLogin';
import OwnerStallProfile from './ownerPages/OwnerStallProfile';
import OwnerEditProfile from './ownerPages/OwnerEditProfile';
import OwnerStallMenu from './ownerPages/OwnerStallMenu';
import OwnerOrderQueue from './ownerPages/OwnerOrderQueue';
import OwnerOrderHistory from './ownerPages/OwnerOrderHistory';

{/* Utilities components */}
import RootProtectedRoute from "./utilities/RootProtectedRoute";

import ClientPrivateRoute from './utilities/ClientPrivateRoute';
import { ClientAuthProvider, useClientAuth } from './utilities/ClientAuthContext';

import OwnerPrivateRoute from './utilities/OwnerPrivateRoute';
import { OwnerAuthProvider } from './utilities/OwnerAuthContext';

{/* Hooks components */}
import { useCookieAuth } from "./hooks/useCookieAuth";

function App() {
	const { setRole } = useCookieAuth();

  	const handleRoleSelect = (role) => {
    	setRole(role); 
    	if (role === "Customer") {
     		window.location.href = "/clientLogin";
    	} else if (role === "StallOwner") {
      		window.location.href = "/ownerLogin";
    	}
  	};

 	return (
    	<Router>
      		<Routes>
				<Route path="/checkout" element={ <CheckoutForm/> }/>
				<Route path="/return" element={ <Return/> }/>

				{/* Public route */}
				<Route path="/" element={ <RootProtectedRoute> <RoleSelect onRoleSelect={ handleRoleSelect } /> </RootProtectedRoute>}/>

				{/* Semi-Private route */}
        		<Route path="/clientLogin" element={ <ClientLogin/> }/>
				<Route path="/ownerLogin" element={ <OwnerLogin/> }/>

				{/* Client private route */}
				<Route element={ <ClientAuthProvider> <ClientPrivateRoute/> </ClientAuthProvider> }>
          			<Route path="/clientHome" element={ <HomeWithNavbar component={ <ClientHome/> }/> }/>
					<Route path="/clientProfile" element={ <HomeWithNavbar component= { <ClientProfile/> }/> }/>
					<Route path="/clientEditProfile" element={ <ClientEditProfile/> } />
					<Route path="/clientWallet" element={ <HomeWithNavbar component= { <ClientWallet/> }/> }/>
					<Route path="/clientFavourite" element={ <ClientFavourite/> }/>
					<Route path="/requestMenu/:ownerID" element={ <ResNMenu/> }/>
					<Route path="/checkingout" element={ <Loading/> }/>
        		</Route>
				
				{/* Owner private route */}
				<Route element={ <OwnerAuthProvider> <OwnerPrivateRoute/> </OwnerAuthProvider> }>
					<Route path="/ownerStallProfile" element={  <OwnerStallProfile/> }/>
					<Route path="/ownerEditProfile" element={  <OwnerEditProfile/> }/>
					<Route path="/ownerStallMenu" element = { <OwnerStallMenu/> } />
					<Route path="/ownerOrderQueue" element = { <OwnerOrderQueue/> } />
					<Route path="/ownerOrderHistory" element = { <OwnerOrderHistory/> } />
        		</Route>


      		</Routes>
    	</Router>
  	);
}

function HomeWithNavbar({ component }) {
	const { authData } = useClientAuth();
	const [ activeIcon, setActiveIcon ] = useState(authData?.clientCurrentPath);

	useEffect(() => {
		setActiveIcon(authData?.clientCurrentPath);
	}, [authData?.clientCurrentPath]);

	const handleIconClick = (icon) => {
		setActiveIcon(icon);
	};

	console.log(activeIcon);

	return (<>{ component } <ClientNavBar activeIcon={ activeIcon } onIconClick={ handleIconClick }/></>);
}

export default App;