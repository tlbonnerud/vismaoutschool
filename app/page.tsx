'use client'
import { useEffect } from 'react';

export default function Home() {
	useEffect(() => {
		document.cookie = `sb-session=test-session-token; path=/; max-age=3600;`;
		window.location.href = '/admin';
	}, []);

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">

			<main className="container mx-auto">
				<h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
					Welcome to Visma Outschool
				</h1>
			</main>

			{
				// temporary button to simulate login by setting cookie
				// document is not defined?

			}

			<button
				onClick={() => {
					document.cookie = `sb-session=test-session-token; path=/; max-age=3600;`;
					window.location.href = '/admin';
				}}
				className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
			>
				Simulate Login
			</button>
		</div>
	);
}
