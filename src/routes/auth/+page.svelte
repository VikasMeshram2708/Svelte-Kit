<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { loginSchema } from '../../model/user-mode';
	import { signIn } from '@auth/sveltekit/client';
	const toastStore = getToastStore();

	let toggleForm = $state('login');

	const user: loginSchema = $state({
		email: '',
		password: ''
	});

	const handleLogin = async () => {
		await signIn('github', {
			redirect: true,
			callbackUrl: '/'
		});
	};
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
			<form class="grid gap-4">
				<!-- <input
					bind:value={user.email}
					class="input rounded-lg px-4 py-3"
					type="email"
					placeholder="Type Email"
				/>
				<input
					bind:value={user.password}
					class="input rounded-lg px-4 py-3"
					type="password"
					placeholder="Type Password"
				/> -->
				<button
					type="button"
					class="variant-filled-primary btn w-full rounded-lg py-3 hover:shadow-lg"
				>
					Login
				</button>
				{@render GoogleAuth({ message: 'Sign In With Github' })}
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
				{@render GoogleAuth({ message: 'Sign Up With Github' })}
			</form>
		</section>
	{/if}
</div>

{#snippet GoogleAuth({ message }: { message: string })}
	<button
		onclick={handleLogin}
		type="button"
		class="btn variant-gradient-secondary-primary w-full rounded-lg bg-gradient-to-br py-3 hover:shadow-lg"
	>
		{message}
	</button>
{/snippet}
