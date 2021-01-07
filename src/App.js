/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

/** Components & Helpers */
import Header from './components/layout/Header/Header';
import NavBar from './components/layout/NavBar/NavBar';
import Notification from './components/Notification/Notification';
import SubModal from './components/SubModal/SubModal';
import Routes from './routes/Routes';
import { setCurrUser, logOut } from './store/actions/auth';
import { API } from '../src/pages/UserProfile/api/api';
import './App.css';

const AUTH_TOKEN = 'bearerAuthToken';

function App() {
	const dispatch = useDispatch();

	const loggedInUser = useSelector((state) => state.auth.user);

	const [checkLogIn, setCheckLogIn] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);
	const initialToken = localStorage.getItem(AUTH_TOKEN) || null;
	const [token, setToken] = useState(initialToken);

	useEffect(() => {
		async function getCurrentUser() {
			console.log('checking...');
			// check if user is logged in
			if (token !== null) {
				localStorage.setItem(AUTH_TOKEN, token);
				const decoded = jwt_decode(token);
				const user = await API.getUserData(decoded.uuid);

				console.log(user);
				setCurrentUser(user.data);
				dispatch(setCurrUser(user.data));
			} else {
				console.log('no user');
				localStorage.removeItem(AUTH_TOKEN);
				setCurrentUser(null);
				dispatch(setCurrUser(null));
			}
		}
		if (checkLogIn) {
			getCurrentUser();
			setCheckLogIn(false);
		}
	}, [dispatch, token, currentUser, checkLogIn]);

	const modal = useSelector((state) => state.modal);

	const logOutUser = () => {
		setCurrentUser(null);
		dispatch(logOut());
	};

	/** if no currentUser is logged in, hide the Header and NavBar */
	return (
		<div className="App">
			{!loggedInUser ? (
				<Routes />
			) : (
				<>
					{loggedInUser && (
						<Header currentUser={loggedInUser} logOutUser={logOutUser} />
					)}
					<Notification />
					{modal.isOpen ? <SubModal /> : <Routes />}
					{loggedInUser && (
						<NavBar currentUser={loggedInUser} logOutUser={logOutUser} />
					)}
				</>
			)}
		</div>
	);
}

export default App;
