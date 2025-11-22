// a function that checks if the user is authenticated based on the presence of a session cookie. sb-session cookie
export default function checkAuth(cookies: { [key: string]: string }): boolean {
	return cookies['sb-session'] !== undefined && cookies['sb-session'] !== '';
}
