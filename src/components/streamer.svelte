<script lang="ts">
	import { X } from 'lucide-svelte';
	import { Motion } from 'svelte-motion';
	import type { Channel } from '$lib/types';

	export let streamer: Channel;
	export let removeStreamer: (streamer: Channel) => void;
</script>

<Motion
	let:motion
	transition={{ duration: 0.2 }}
	initial={{ opacity: 0, y: 50 }}
	animate={{ opacity: 1, y: 0 }}
	exit={{ opacity: 0, y: 50 }}
>
	<li use:motion class="bg-white rounded-2xl p-4 flex justify-between items-center relative">
		<button
			class="absolute -top-2 -right-2 p-1 bg-red-200 border-[0.5px] border-red-400 rounded-full text-red-400"
			on:click={() => {
				console.log('Remove streamer');
				removeStreamer(streamer);
			}}
		>
			<X class="w-5 h-5" />
		</button>
		<div class="flex items-center gap-4">
			<img
				src={streamer.thumbnail_url}
				alt={streamer.display_name}
				class="w-20 h-20 rounded-full"
			/>
			<h3 class="text-xl font-medium">{streamer.display_name}</h3>
		</div>
		<div>{streamer.hours_streamed || 'Loading'}</div>
	</li>
</Motion>
