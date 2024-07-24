import puppeteer from 'puppeteer';

export async function POST({ request }) {
	const { channel } = await request.json();

	console.time('Total Execution Time');

	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});

	console.time('Browser Launch Time');
	const page = await browser.newPage();
	console.timeEnd('Browser Launch Time');

	// Set a minimal viewport size
	await page.setViewport({ width: 1280, height: 800 });

	// Block unnecessary requests
	await page.setRequestInterception(true);
	page.on('request', (req) => {
		const resourceType = req.resourceType();
		if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font') {
			req.abort();
		} else {
			req.continue();
		}
	});

	console.time('Page Navigation Time');
	// Go to the channel's TwitchTracker page
	await page.goto(`https://twitchtracker.com/${channel}`, {
		waitUntil: 'networkidle0'
	});
	console.timeEnd('Page Navigation Time');

	console.time('Data Extraction Time');
	// Wait for the performance panel to load
	await page.waitForSelector('#performance-panel');

	// Get the hours streamed value
	const hoursStreamed = await page.evaluate(() => {
		const blocks = document.querySelectorAll('div.g-x-s-block');
		for (const block of blocks) {
			const label = block.querySelector('div.g-x-s-label')?.textContent?.trim();
			if (label === 'Hours streamed') {
				const value = block.querySelector('div.g-x-s-value > div > span')?.textContent?.trim();
				return value;
			}
		}
		return null;
	});
	console.timeEnd('Data Extraction Time');

	await browser.close();

	console.timeEnd('Total Execution Time');

	if (!hoursStreamed) {
		return new Response(JSON.stringify({ error: 'Could not find hours streamed.' }), {
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	return new Response(JSON.stringify({ hoursStreamed }), {
		headers: {
			'content-type': 'application/json'
		}
	});
}
