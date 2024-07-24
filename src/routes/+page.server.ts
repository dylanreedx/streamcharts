import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	// const channel = await request.json();

	// get access token:
	// curl -X POST https://id.twitch.tv/oauth2/token -d 'client_id=&client_secret=&grant_type=client_credentials'
	const response = await fetch(`https://api.twitch.tv/helix/search/channels?query=loserfruit`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
			'Client-Id': '1l05y9ihrioqvimwbfnyxs0gv8e8rq'
		}
	});

	const { data } = await response.json();

	console.log(data);
	if (data) {
		return {
			channel: data[0]
		};
	}

	// error(404, 'Not found');
};
