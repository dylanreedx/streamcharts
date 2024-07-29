import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium-min';

export async function getBrowser() {
	return puppeteer.launch({
		args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath(
			`https://github.com/Sparticuz/chromium/releases/download/v123.0.1/chromium-v123.0.1-pack.tar`
		),
		headless: chromium.headless,
		ignoreHTTPSErrors: true
	});
}
