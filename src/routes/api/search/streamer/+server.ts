import { TWITCH_ACCESS_TOKEN, TWITCH_CLIENT_ID } from '$env/static/private';
export async function POST({ request }) {
	const { channel } = await request.json();
	console.log('deep server', channel);
	const response = await fetch(
		`https://api.twitch.tv/helix/search/channels?query=${channel}&first=5`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${TWITCH_ACCESS_TOKEN}`,
				'Client-Id': TWITCH_CLIENT_ID
			}
		}
	);

	const { data } = await response.json();

	console.log('deep server', data);

	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json'
		}
	});
}
