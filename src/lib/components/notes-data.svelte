<script lang="ts">
	import { getContext } from 'svelte';

	const notes = getContext('notes');
</script>

<div class="card container mx-auto h-screen w-screen rounded p-2 shadow-lg">
	<h1>Hello,world</h1>
	<pre>{JSON.stringify(notes, null, 4)}</pre>
</div>
