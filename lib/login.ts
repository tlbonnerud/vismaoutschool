import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
	const { email, password } = await request.json();

	// query database for user with matching email and password
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 401 });
	} else {

		const response = NextResponse.json({ user: data.user });
		response.cookies.set('sb-session', data.session?.access_token || '', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',

		});

		return response;
	}
}

