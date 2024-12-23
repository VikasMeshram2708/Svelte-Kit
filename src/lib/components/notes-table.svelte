<script lang="ts">
	type Note = {
		id: string;
		title: string;
		userId: string;
		description: string;
		createdAt: string;
		updatedAt: string;
	};

	let { data } = $props();
</script>

<div class="container mx-auto py-20">
	<!-- Responsive Container (recommended) -->
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Sr. No</th>
					<th>Title</th>
					<th>Description</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{#each data as note, i (note.id)}
					<tr>
						<td>{i + 1}</td>
						<td>{note.title}</td>
						<td>{note.description}</td>
						<td>{new Date(note.createdAt).toLocaleDateString()}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="3">Showing x/x Results</th>
					<td>totalWeight</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
