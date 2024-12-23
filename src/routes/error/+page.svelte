<script lang="ts">
	export let data;
	console.log('g', data?.message);
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<h1 class="chead text-center">{data?.message ? data?.message : 'Error Occurred'}</h1>
	<button type="button" class="variant-filled-primary btn">
		<a href="/" class="text-white">Go To Home Page</a>
	</button>
</div>
