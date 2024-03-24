import React, { useState, useEffect } from 'react';
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
	const history = useNavigate();

	useEffect(() => {
		const logout = async () => {
			try {
				await axiosInstance.post('user/logout/blacklist/', {
					refresh_token: localStorage.getItem('refresh_token'),
				});
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
				axiosInstance.defaults.headers['Authorization'] = null;
				history.push('/login');
			} catch (error) {
				console.error('Logout error:', error);
			}
		};

		logout();
	}, [history]);

	return <div>Logout</div>;
}
