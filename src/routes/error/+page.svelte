<script lang="ts">
	export let data;
	console.log('g', data?.message);
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<h1 class="chead text-center">An {data?.message} Occurred</h1>
	<button type="button" class="variant-filled-error btn">
		<a href="/">Go To Home Page</a>
	</button>
</div>
