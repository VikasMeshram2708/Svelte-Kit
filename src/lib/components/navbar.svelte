<script lang="ts">
	let { ssId } = $props();
</script>

<header class="border-b">
	<nav class="flex items-center justify-between p-3">
		<h1 class="text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl">
			<a href="/">Svelte Todo App</a>
		</h1>
		{#if ssId}
			<form method="POST" action="/?/logout">
				<button type="submit" class="variant-filled-primary btn">Logout</button>
			</form>
		{:else}
			<button type="button" class="variant-filled-primary btn">
				<a href="/auth/login">Login / SignUp</a>
			</button>
		{/if}
	</nav>
</header>
