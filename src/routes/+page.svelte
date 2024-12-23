<script lang="ts">
	// import NotesForm from '$lib/components/notes-form.svelte';
	import NotesTable from '$lib/components/notes-table.svelte';
	// import type { PageData } from './$types';

	let { data } = $props();
	// console.log('data', data);
</script>

<div class="min-h-screen">
	<div class="py-20">
		<NotesTable notes={data?.notes} meta={data?.meta} />
		<!-- <NotesForm /> -->
	</div>
</div>
