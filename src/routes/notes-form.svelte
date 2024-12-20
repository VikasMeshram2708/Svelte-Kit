<article class="card">
	<h1 class="chead card-header text-center">Create a Note</h1>
	<section class="p-4">
		<form method="POST" action="?/createNote" class="grid gap-2">
			<input class="input px-4 py-2" placeholder="Type Title" type="text" name="title" />
			<input
				class="input px-4 py-2"
				placeholder="Type Description"
				type="text"
				name="description"
			/>
			<button class="variant-filled-primary btn">Create</button>
		</form>
	</section>
</article>
