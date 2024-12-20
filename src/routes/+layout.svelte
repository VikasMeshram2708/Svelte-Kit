<script lang="ts">
	import '../app.css';
	import Header from '../components/Header.svelte';
	import { Toast, initializeStores } from '@skeletonlabs/skeleton';
	let { children } = $props();

	initializeStores();
</script>

<Header />
<main class="mx-auto h-screen w-screen max-w-7xl py-10">
	{@render children()}
	<Toast position="tr" />
</main>
