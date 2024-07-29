<script lang="ts">
	import { CirclePlus, ChevronLeft, Annoyed } from 'lucide-svelte';
	import Streamer from '../components/streamer.svelte';
	import { Motion } from 'svelte-motion';
	import type { PageData } from './$types';
	import type { Channel } from '$lib/types';

	// export let data: PageData;

	let searchQuery = '';
	let channels: Channel[] = [];

	async function searchChannel() {
		if (searchQuery.trim() === '') return;

		const response = await fetch('/api/search/streamer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ channel: searchQuery })
		});

		if (response.ok) {
			const data = await response.json();
			console.log('clien', data);
			channels = data;
		} else {
			console.error('Channel not found');
		}
	}

	let streamers: Channel[] = [];

	const addStreamer = async (streamer: Channel) => {
		streamers = [...streamers, streamer];

		const response = await fetch('/api/streamer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ channel: streamer.display_name })
		});

		if (response.ok) {
			console.log('Streamer added');

			// add hours streamed to streamer object
			const data = await response.json();
			const streamerIndex = streamers.findIndex((s) => s.display_name === streamer.display_name);
			streamers[streamerIndex].hours_streamed = data.hoursStreamed;
			streamers[streamerIndex].rank = data.rank;
		} else {
			console.error('Failed to add streamer');
		}
	};

	const removeStreamer = (streamer: Channel) => {
		streamers = streamers.filter((s) => s.display_name !== streamer.display_name);
	};

	let screens = ['streamerList', 'searchStreamers'];

	let transition = {
		type: 'spring',
		duration: 0.25,
		stiffness: 200,
		damping: 20
	};

	let currentScreen = screens[0];
</script>

<section
	class="w-3/4 max-w-3/4 rounded-3xl h-1/2 max-h-1/2 bg-[url('/background-1.webp')] py-12 px-32"
>
	<div class="w-full h-full shadow-2xl rounded-3xl bg-gray-200 p-4 overflow-hidden">
		{#if currentScreen === 'streamerList'}
			<Motion
				let:motion
				layout
				initial={{ x: -200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				{transition}
			>
				<div use:motion>
					<h2 class="text-2xl font-medium opacity-35 my-2 uppercase">July 2024</h2>
					<ul class="flex flex-col gap-2">
						{#each streamers as streamer}
							<Streamer {streamer} {removeStreamer} />
						{/each}
					</ul>
					<button
						on:click={() => {
							currentScreen = screens[1];
						}}
						class="flex justify-center gap-2 py-4 border-2 border-gray-300 border-dashed rounded-2xl text-gray-400 mt-4 w-full hover:bg-white hover:text-black duration-200 hover:border-transparent hover:shadow-md"
					>
						<span>Add Streamer</span>
						<CirclePlus class="w-6 h-6" />
					</button>
				</div>
			</Motion>
		{:else}
			<Motion
				let:motion
				layout
				initial={{ x: 200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				{transition}
			>
				<div use:motion>
					<div class="flex items-center">
						<button
							on:click={() => {
								currentScreen = screens[0];
							}}
						>
							<ChevronLeft class="w-6 h-6" />
						</button>
						<h2 class="text-2xl font-medium opacity-35 my-2 uppercase">Search Streamers</h2>
					</div>
					<div class="flex flex-col w-full gap-2">
						<input
							type="text"
							bind:value={searchQuery}
							on:input={searchChannel}
							autofocus
							placeholder="Search streamers..."
							class="w-full p-2 border-[0.5px] border-gray-300 rounded-xl outline-gray-300"
						/>
						{#if channels.length > 0}
							<Motion
								let:motion
								layout
								initial={{ y: 100, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{
									type: 'spring',
									duration: 0.25,
									stiffness: 200,
									damping: 20
								}}
							>
								<ul use:motion class="top-16 w-full bg-white rounded-xl shadow-2xl overflow-hidden">
									{#each channels as channel}
										<li>
											<button
												class="p-2 hover:bg-gray-100 duration-200 flex items-center gap-4 cursor-pointer w-full"
												on:click={() => {
													currentScreen = screens[0];
													addStreamer(channel);
												}}
											>
												<img
													src={channel.thumbnail_url}
													alt={channel.display_name}
													class="w-20 h-20 rounded-full"
												/>
												<span class="text-xl">{channel.display_name}</span>
											</button>
										</li>
									{/each}
								</ul>
							</Motion>
						{:else}
							<div class="text-gray-400">
								<Annoyed class="w-10 h-10 mx-auto" />
								<p class="text-center font-semibold">No streamers found</p>
							</div>
						{/if}
					</div>
				</div>
			</Motion>
		{/if}
	</div>
</section>
