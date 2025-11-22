'use client';
import { useState } from 'react';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setError(''); // Clear previous errors

		// Basic client-side validation
		if (!email || !password) {
			setError('Please enter both email and password.');
			return;
		}

		try {
			// Replace with your actual API call to the backend for authentication
			const response = await fetch('@/app/lib/login.ts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Login failed');
			}

			// Handle successful login (e.g., store token, redirect)
			const data = await response.json();
			console.log('Login successful:', data);
			// Example: Redirect to a dashboard page
			// history.push('/dashboard'); 
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow">
			<h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Login</h2>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
						required
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
						Password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
