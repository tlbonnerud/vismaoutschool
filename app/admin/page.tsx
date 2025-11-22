'use client';
import UserManagement from "@/app/components/UserManagement";
import checkAuth from "@/lib/checkAuth";

export default function Home() {

	const cookies = document.cookie.split('; ').reduce((acc, curr) => {
		const [key, ...v] = curr.split('=');
		acc[key] = v.join('=');
		return acc;
	}, {} as { [key: string]: string });

	if (!checkAuth(cookies)) {
		window.location.href = '/';
		return null;
	}

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
			<main className="container mx-auto">
				<h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
					Visma Outschool - User Management
				</h1>
				<UserManagement />
				{// temporary button to simulate logout by setting cookie
				}
				<button
					onClick={() => {
						document.cookie = `sb-session=; path=/; max-age=0;`;
						window.location.reload();
					}}
					className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
				>
					Logout
				</button>
			</main>
		</div>
	);
}
