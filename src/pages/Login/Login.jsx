import React from 'react';
import { useHistory } from 'react-router-dom';
// import { Link, useHistory } from 'react-router-dom';
// import LoginHeader from './components/LoginHeader';
// import useFields from '../../hooks/useFields';
// import { Button } from '@material-ui/core';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../images/logo/mate-logo.png';
import { googleLogin } from '../../store/actions/auth';

/** User Login Form */
export function Login() {
	const dispatch = useDispatch();

	/** Use history to redirect after user logs in/signs up */
	const history = useHistory();

	const currentUser = useSelector((state) => state.auth.user);

	if (currentUser) {
		history.push('/feed');
	}

	/** if user signs in using Google, store their data to redux store
	 * and redirect to home page feed
	 */
	const googleSignIn = () => {
		dispatch(googleLogin());
		history.push('/feed');
	};

	return (
		<div className="Login__container">
			<div className="Signup-Header">
				<h3 className="mate-text-primary font-italic m-auto">
					Stay connected with your College Mates!
				</h3>
				<div className="Mate-Logo">
					<img src={Logo} alt="Mate" />
				</div>
			</div>
			<form className="Login__form mb-3">
				{/* <div className='form-group'>
					<label htmlFor='email' className='mate-text-primary float-left'>
						Email
					</label>
					<input
						id='email'
						className='form-control mate-form-input'
						type='text'
						name='email'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password' className='mate-text-primary float-left'>
						Password
					</label>
					<input
						id='password'
						className='form-control mate-form-input'
						type='text'
						name='password'
					/>
				</div>
				<div className='form-group'>
					<Link
						to='#'
						className='mate-text-secondary mb-3 text-sm float-right font-italic'>
						Forgot Password?
					</Link>
				</div> */}
				<div className="Login__buttons">
					<button id="Login-Google__btn" onClick={googleSignIn}>
						Sign In With Google
					</button>
					<p>*.edu email required</p>
				</div>
			</form>
			{/* <div className='Login-Footer'>
				<p>
					Don't have an account?
					<Link className='mate-text-primary ml-2' to='/signup'>
						Sign Up
					</Link>
				</p>
			</div> */}
		</div>
	);
}
