export async function POST({ request }) {
	const { channel } = await request.json();

	const trackerUrl = `https://twitchtracker.com/api/channels/summary/${channel}`;

	const response = await fetch(trackerUrl);
	const data = await response.json();
	console.log(data);

	const hoursStreamed = Math.round(data.minutes_streamed / 60);

	if (!hoursStreamed) {
		return new Response(JSON.stringify({ error: 'Could not find hours streamed.' }), {
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	return new Response(JSON.stringify({ hoursStreamed, rank: data.rank }), {
		headers: {
			'content-type': 'application/json'
		}
	});
}
