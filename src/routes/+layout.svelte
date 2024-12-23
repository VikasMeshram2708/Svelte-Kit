<script lang="ts">
	import type { Session } from '@auth/sveltekit';
	import '../app.css';
	import Header from '../lib/components/Header.svelte';
	import { Toast, initializeStores } from '@skeletonlabs/skeleton';
	let { children, data }: { children: any; data: Session } = $props();

	initializeStores();
</script>

<Header />
<main class="h-screen w-screen">
	{@render children()}
	<Toast position="tr" />
</main>
