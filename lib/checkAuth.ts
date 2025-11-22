export default function checkAuth(cookies: { [key: string]: string }): boolean {
	const sessionCookie = cookies['sb-session'];
	return sessionCookie !== undefined && sessionCookie !== '';
}
