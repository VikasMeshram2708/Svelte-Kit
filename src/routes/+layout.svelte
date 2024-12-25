<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { type Snippet } from 'svelte';
	import '../app.css';
	import type { PageData } from './$types';
	let { children, data }: { children: Snippet; data: PageData } = $props();

	// @ts-ignore
	let ssId = $state(data?.user?.token?.id);
</script>

<Navbar {ssId} />
{@render children()}
