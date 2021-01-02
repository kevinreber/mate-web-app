/** Dependencies */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

/** Components & Helpers */
import Header from './components/layout/Header/Header';
import NavBar from './components/layout/NavBar/NavBar';
import Notification from './components/Notification/Notification';
import SubModal from './components/SubModal/SubModal';
import Routes from './routes/Routes';
import { setCurrentUser } from './store/actions/auth';
import { auth } from './config/fbConfig';
import './App.css';

function App() {
	const dispatch = useDispatch();

	const BEARER_AUTH_TOKEN = localStorage.getItem('bearerAuthToken');
	if (BEARER_AUTH_TOKEN) {
		// * WIP: Handle BEARER_AUTH_TOKEN
		// * when decoded, receive object below
		// {
		// exp: 1609801069;
		// iat: 1609541869;
		// iss: 'https://api.mateapp.us/api/login';
		// jti: 'mqBuCjtIM8PP4Gx0';
		// nbf: 1609541869;
		// prv: '23bd5c8949f600adb39e701c400872db7a5976f7';
		// sub: '4';
		// uuid: '0771401d-f6a2-4c1a-8965-81b889959437';
		// }
		let test = jwt_decode(BEARER_AUTH_TOKEN);
		console.log(BEARER_AUTH_TOKEN, test);
	}

	useEffect(() => {
		function getCurrentUser() {
			// check if user is logged in
			auth.onAuthStateChanged((user) => {
				if (user) {
					dispatch(setCurrentUser(user));
				} else {
					console.log('no user');
				}
			});
		}
		getCurrentUser();
	}, [dispatch]);

	const currentUser = useSelector((state) => state.auth.user);
	const modal = useSelector((state) => state.modal);

	/** if no currentUser is logged in, hide the Header and NavBar */
	return (
		<div className="App">
			{currentUser ? (
				<>
					<Header />
					<Notification />
					{modal.isOpen ? <SubModal /> : <Routes />}
					<NavBar />
				</>
			) : (
				<Routes />
			)}
		</div>
	);
}

export default App;
