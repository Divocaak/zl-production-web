import { json } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	cookies.delete('auth', {
		path: '/'
	});

	return json({ success: true });
};