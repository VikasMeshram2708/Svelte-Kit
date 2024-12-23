<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';

	import { page } from '$app/stores';
	
	const handleLogout = async () => {
		await signOut();
	};
</script>

<header class="border-b p-3 shadow-lg">
	<nav class="mx-auto flex w-full max-w-7xl items-center justify-between">
		<h1 class="text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl">
			<a href="/">Notes Taking App</a>
		</h1>
		<div>
			{#if $page?.data?.session !== null}
				<button onclick={handleLogout} type="button" class="variant-filled-primary btn">
					Logout
				</button>
			{:else}
				<button type="button" class="variant-filled-primary btn">
					<a href="/auth">Login / Sign Up</a>
				</button>
			{/if}
		</div>
	</nav>
</header>
