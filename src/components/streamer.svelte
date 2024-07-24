<script lang="ts">
	import type { Channel } from '$lib/types';

	export let streamer: Channel;
</script>

<li class="bg-white rounded-2xl p-4 flex justify-between items-center">
	<div class="flex items-center gap-4">
		<img src={streamer.thumbnail_url} alt={streamer.display_name} class="w-20 h-20 rounded-full" />
		<h3 class="text-xl font-medium">{streamer.display_name}</h3>
	</div>
	<div>151.4</div>
</li>
