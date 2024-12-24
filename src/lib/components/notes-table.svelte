<script lang="ts">
	import { page } from '$app/stores';

	let data = $props();
	let pageSize = 5;
	let pgState = $derived({
		totalNotes: data?.meta?.total,
		totalPages: Math.ceil(data?.meta?.total / pageSize),
		currentPage:
			($page.url.searchParams.get('skip')
				? Math.floor(Number($page.url.searchParams.get('skip')) / pageSize)
				: 0) + 1,
		startIndex: $page.url.searchParams.get('skip') ? Number($page.url.searchParams.get('skip')) : 0
	});
</script>

<div class="mx-auto w-full max-w-7xl p-4">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>No.</th>
				<th>Title</th>
				<th>Description</th>
				<th>TimeStamp</th>
			</tr>
		</thead>
		<tbody>
			{#each data?.notes || [] as note, i (note.id)}
				<tr>
					<td>{pgState.startIndex + i + 1}</td>
					<td class="font-bold">{note.title}</td>
					<td>{note.description}</td>
					<td
						>{new Date(note.createdAt).toLocaleDateString([], {
							minute: '2-digit',
							hour: '2-digit'
						})}</td
					>
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="mt-4 flex justify-center gap-2">
		{#each Array(pgState.totalPages) as _, idx}
			<a
				class="btn {idx + 1 === pgState.currentPage
					? 'variant-filled-primary'
					: 'variant-ghost-primary'}"
				href="/?limit={pageSize}&skip={pageSize * idx}"
			>
				{idx + 1}
			</a>
		{/each}
	</div>
</div>
