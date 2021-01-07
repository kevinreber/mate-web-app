import { useState, useEffect } from 'react';
const AUTH_TOKEN = 'bearerAuthToken';
function useLocalStorageToken() {
	const initialToken = localStorage.getItem(AUTH_TOKEN) || null;
	const [token, setToken] = useState(initialToken);

	useEffect(() => {
		function setTokenLocalStorage() {
			if (token === null) {
				localStorage.removeItem(AUTH_TOKEN);
			} else {
				localStorage.setItem(AUTH_TOKEN, token);
			}
		}
		setTokenLocalStorage();
	}, [token]);

	return [token, setToken];
}

export default useLocalStorageToken;
