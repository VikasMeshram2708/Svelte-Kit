<script lang="ts">
	let toggleForm = $state('login');
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center px-4">
	<!-- Toggle Between Login and Sign Up -->
	<div class="mb-6 flex gap-4">
		<button
			class={`btn px-6 py-2 ${toggleForm === 'login' ? 'variant-filled-primary' : 'variant-outlined-primary'}`}
			onclick={() => (toggleForm = 'login')}
		>
			Login
		</button>
		<button
			class={`btn px-6 py-2 ${toggleForm === 'signup' ? 'variant-filled-primary' : 'variant-outlined-primary'}`}
			onclick={() => (toggleForm = 'signup')}
		>
			Sign Up
		</button>
	</div>

	{#if toggleForm === 'login'}
		<section class="card w-full max-w-md rounded-lg p-6 shadow-md">
			<h1 class="chead pb-4 text-center text-lg font-semibold">Login</h1>
			<form action="" class="grid gap-4">
				<input class="input rounded-lg px-4 py-3" type="email" placeholder="Type Email" />
				<input class="input rounded-lg px-4 py-3" type="password" placeholder="Type Password" />
				<button
					type="submit"
					class="variant-filled-primary btn w-full rounded-lg py-3 hover:shadow-lg"
				>
					Login
				</button>
			</form>
		</section>
	{:else}
		<section class="card w-full max-w-md rounded-lg p-6 shadow-md">
			<h1 class="chead pb-4 text-center text-lg font-semibold">Sign Up</h1>
			<form action="" class="grid gap-4">
				<input class="input rounded-lg px-4 py-3" type="text" placeholder="Type Name" />
				<input class="input rounded-lg px-4 py-3" type="email" placeholder="Type Email" />
				<input class="input rounded-lg px-4 py-3" type="password" placeholder="Type Password" />
				<button
					type="submit"
					class="variant-filled-primary btn w-full rounded-lg py-3 hover:shadow-lg"
				>
					Sign Up
				</button>
			</form>
		</section>
	{/if}
</div>
