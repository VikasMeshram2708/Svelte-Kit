<script lang="ts">
	import '../app.css';
	import Header from './Header.svelte';
	let { children } = $props();
</script>

<Header />
<main class="mx-auto h-screen w-screen max-w-7xl py-10">
	{@render children()}
</main>
