<script>
	import { CirclePlus } from 'lucide-svelte';
	import AddStreamer from '../components/add-streamer.svelte';
	import Streamer from '../components/streamer.svelte';
	import {
		Motion,
		AnimatePresence,
		AnimateSharedLayout,
		animate,
		useMotionValue
	} from 'svelte-motion';

	let screens = ['streamerList', 'searchStreamers'];

	let transition = {
		type: 'spring',
		duration: 0.25,
		stiffness: 200,
		damping: 20
	};

	let currentScreen = screens[0];
</script>

<section class="w-3/4 max-w-3/4 rounded-3xl h-1/2 bg-[url('/background-1.webp')] py-12 px-32">
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
						<Streamer />
						<Streamer />
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
					<h2 class="text-2xl font-medium opacity-35 my-2 uppercase">Search Streamers</h2>
					test
					<button
						on:click={() => {
							currentScreen = screens[0];
						}}
						class="flex justify-center gap-2 py-4 border-2 border-gray-300 border-dashed rounded-2xl text-gray-400 mt-4 w-full hover:bg-white hover:text-black duration-200 hover:border-transparent hover:shadow-md"
					>
						<span>Back to List</span>
					</button>
				</div>
			</Motion>
		{/if}
	</div>
</section>
