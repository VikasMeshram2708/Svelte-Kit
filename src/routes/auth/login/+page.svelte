<script lang="ts">
	import { X } from 'lucide-svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let toggleModal = $state(true);
</script>

{#snippet CloseButton()}
	<button onclick={() => (toggleModal = false)} type="button">
		<X />
	</button>
{/snippet}

<div class="h-screen w-screen py-20">
	{#if toggleModal}
		{#if form?.error}
			<div class="alert variant-filled-primary mx-auto max-w-lg">
				<p class="alert-message">{form?.error}</p>
				{@render CloseButton()}
			</div>
		{:else if form?.missing}
			<div class="alert variant-filled-primary mx-auto max-w-lg">
				<p class="alert-message">{form?.email}</p>
				<p class="alert-message">{form?.password}</p>
				{@render CloseButton()}
			</div>
		{:else if form?.success}
			<div class="alert variant-filled-primary mx-auto max-w-lg">
				<p class="alert-message">Success: User Registered</p>
				{@render CloseButton()}
			</div>
		{/if}
	{/if}

	<article class="card mx-auto max-w-lg p-3">
		<h1 class="chead p-3 text-center">Login</h1>
		<form class="grid gap-3" action="?/login" method="POST">
			<input placeholder="Type Email" class="input px-4 py-2" type="text" name="email" id="" />
			<input
				placeholder="Type Password"
				class="input px-4 py-2"
				type="password"
				name="password"
				id=""
			/>
			<button type="submit" class="variant-filled-primary btn">Login</button>
			<p class="text-center">
				Not an User ?
				<a href="/auth/signup">Sign Up</a>
			</p>
		</form>
	</article>
</div>
