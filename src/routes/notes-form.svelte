<script lang="ts">
	import { noteSchema } from '../model/note-model';

	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	// Initialize noteState with type from noteSchema
	const noteState: noteSchema = $state({
		title: '',
		description: ''
	});

	let errorState = $state({
		titleErr: '',
		descErr: ''
	});

	const toastStore = getToastStore();

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();

		try {
			// Parse and validate the noteState
			const parsedRes = noteSchema.safeParse(noteState);

			// console.log('data', noteState);

			if (!parsedRes.success) {
				// console.log('Validation errors:', parsedRes.error);
				// If validation fails, populate the error state
				errorState = {
					titleErr: parsedRes.error.flatten().fieldErrors?.title?.[0] || '',
					descErr: parsedRes.error.flatten().fieldErrors?.description?.[0] || ''
				};
			} else {
				noteState.title = '';
				noteState.description = '';
				errorState.titleErr = '';
				errorState.descErr = '';

				const toastSettings: ToastSettings = {
					message: 'Form is valid! Submitting...',
					background: 'variant-filled-primary'
				};

				toastStore.trigger({
					message: toastSettings.message,
					background: toastSettings.background
				});

				// Handle successful form submission
				// console.log('Form is valid! Submitting...');
				// You can process the valid data here (e.g., send to an API or update UI)
			}
		} catch (error) {
			console.error(`Something went wrong. Please try again. ${error}`);
		}
	};
</script>

<article class="card">
	<h1 class="chead card-header text-center">Create a Note</h1>
	<section class="p-4">
		<form onsubmit={handleSubmit} class="grid gap-2">
			<!-- Display error messages conditionally -->
			{#if errorState.titleErr}
				<p class="text-sm text-red-500">{errorState.titleErr}</p>
			{/if}

			<input
				bind:value={noteState.title}
				class="input px-4 py-2"
				placeholder="Type Title"
				type="text"
				name="title"
			/>

			{#if errorState.descErr}
				<p class="text-sm text-red-500">{errorState.descErr}</p>
			{/if}

			<input
				bind:value={noteState.description}
				class="input px-4 py-2"
				placeholder="Type Description"
				type="text"
				name="description"
			/>

			<button type="submit" class="variant-filled-primary btn">Create</button>
		</form>
	</section>
</article>
