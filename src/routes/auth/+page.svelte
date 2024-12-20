<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { loginSchema } from '../../model/user-mode';

	const toastStore = getToastStore();

	let toggleForm = $state('login');

	const user: loginSchema = $state({
		email: '',
		password: ''
	});

	const handleLogin = async (e: SubmitEvent) => {
		e.preventDefault();

		const parsedRes = loginSchema.safeParse(user);
		if (!parsedRes.success) {
			const emailErr = parsedRes.error.flatten().fieldErrors.email?.[0] as string;
			const passwordErr = parsedRes.error.flatten().fieldErrors.password?.[0] as string;
			if (emailErr) {
				return toastStore.trigger({
					message: emailErr,
					background: 'variant-filled-primary'
				});
			}
			if (passwordErr) {
				return toastStore.trigger({
					message: passwordErr,
					background: 'variant-filled-primary'
				});
			}
		}
		const configData = parsedRes.data;

		const res = await fetch('/auth', {
			method: 'POST',
			body: new URLSearchParams({
				email: configData?.email as string,
				password: configData?.password as string
			})
		});

		if (!res.ok) {
			return toastStore.trigger({
				message: 'Login Error',
				background: 'variant-filled-primary'
			});
		}
		console.log('ld', user);
		return toastStore.trigger({
			message: 'User Logged In',
			background: 'variant-filled-success'
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
			<form onsubmit={handleLogin} class="grid gap-4">
				<input
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
				/>
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
