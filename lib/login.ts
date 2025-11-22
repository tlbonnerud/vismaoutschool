// handle login logic based on method this is the backend
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
		return NextResponse.json({ message: error.message }, { status: 401 });
	}

	return NextResponse.json({ user: data.user });


}


