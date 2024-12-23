<script lang="ts">
	// import NotesForm from '$lib/components/notes-form.svelte';
	import NotesTable from '$lib/components/notes-table.svelte';
	import { X } from 'lucide-svelte';
	// import type { PageData } from './$types';

	let { data } = $props();
	let toggle = $state(false); // Toggle the Notes Form
</script>

<div class="relative min-h-screen p-6 sm:p-10">
	<div class="mb-6 flex justify-end">
		<button onclick={() => (toggle = !toggle)} type="button" class="variant-filled-primary btn">
			Add Note
		</button>
	</div>

	{#if toggle}
		{@render AddNoteModal()}
	{/if}
	<NotesTable notes={data?.notes} meta={data?.meta} />
</div>

{#snippet AddNoteModal()}
	<section
		class="absolute inset-0 top-0 z-40 flex h-screen items-center justify-center bg-black/50 py-10"
	>
		<form class="card w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
			<div class="mb-4 flex items-center justify-between">
				<h1 class="text-lg font-bold">Add New Note</h1>
				<button
					type="button"
					class="variant-filled-primary btn rounded-full"
					onclick={() => (toggle = false)}
				>
					<X size={20} />
				</button>
			</div>
			<div class="space-y-4">
				<input
					class="focus:ring-primary input w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring"
					placeholder="Type Title"
					type="text"
					name="title"
					id="title"
				/>
				<textarea
					class="focus:ring-primary input w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring"
					placeholder="Type Description"
					name="description"
					id="description"
					rows="4"
				></textarea>
			</div>
			<div class="mt-6">
				<button
					onclick={() => (toggle = false)}
					type="button"
					class="variant-filled-primary btn px-6 py-2"
				>
					Add Note
				</button>
			</div>
		</form>
	</section>
{/snippet}
