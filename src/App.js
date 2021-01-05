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
import { API } from '../src/pages/UserProfile/api/api';
import './App.css';

function App() {
	const dispatch = useDispatch();
	const BEARER_AUTH_TOKEN = localStorage.getItem('bearerAuthToken');

	useEffect(() => {
		async function getCurrentUser() {
			const token = jwt_decode(BEARER_AUTH_TOKEN);
			console.log(BEARER_AUTH_TOKEN, token);
			const user = await API.getUserData(token.uuid);

			// check if user is logged in
			if (user) {
				dispatch(setCurrentUser(user.data));
			} else {
				console.log('no user');
			}
		}
		getCurrentUser();
	}, [dispatch, BEARER_AUTH_TOKEN]);

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
