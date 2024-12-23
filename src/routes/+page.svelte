<script lang="ts">
	// import NotesForm from '$lib/components/notes-form.svelte';
	import NotesTable from '$lib/components/notes-table.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- 
<pre
	class="mx-auto max-w-lg overflow-auto rounded-lg border border-slate-600 bg-slate-800 text-sm text-white shadow-lg">
	{JSON.stringify(data?.data, null, 6)}
</pre> -->

<div class="min-h-screen">
	<NotesTable data={data.data} />
	<!-- <div class="py-20">
		<NotesForm />
	</div> -->
</div>
