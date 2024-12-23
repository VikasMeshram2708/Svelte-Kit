<script lang="ts">
  import { enhance } from '$app/forms';
  import { Check, OctagonAlert, X } from 'lucide-svelte';
  
  let error = $state<string | null>(null);
  let success = $state(false);
  let showAlert = $state(true);
</script>

<article class="card mx-auto max-w-xl">
  <h1 class="chead card-header text-center">Create a Note</h1>
  <section class="p-4">
    <form
      method="POST"
      action="?/createNote"
      use:enhance={() => {
        // Reset states before submission
        error = null;
        success = false;
        showAlert = true;
        
        return ({ result, update }) => {
          if (result?.type === 'failure') {
            error = String(result?.data?.error) || 'Something went wrong.';
          } else {
            success = true;
            update();
          }
        };
      }}
      class="grid gap-4"
    >
      {#if showAlert}
        {#if error}
          {@render AlertMessage({
            type: 'error',
            title: 'Error',
            message: error,
            onClose: () => (showAlert = false)
          })}
        {:else if success}
          {@render AlertMessage({
            type: 'success',
            title: 'Success',
            message: 'Note Added Successfully',
            onClose: () => (showAlert = false)
          })}
        {/if}
      {/if}

      <div class="form-group">
        <label for="title" class="mb-1 block text-sm font-medium">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          class="input w-full px-4 py-2"
          placeholder="Enter title"
          required
        />
      </div>

      <div class="form-group">
        <label for="description" class="mb-1 block text-sm font-medium">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          class="textarea w-full px-4 py-2"
          placeholder="Enter description"
          required
        ></textarea>
      </div>

      <button type="submit" class="variant-filled-primary btn">Add Note</button>
    </form>
  </section>
</article>

{#snippet AlertMessage({
  type,
  title,
  message,
  onClose
}: {
  type: string;
  title: string;
  message: string;
  onClose: () => void;
})}
  <aside class="alert variant-ghost">
    {#if type === 'error'}
      <OctagonAlert color="red" />
    {:else}
      <Check color="green" />
    {/if}
    
    <div class="alert-message">
      <h3 class="h3">{title}</h3>
      <p>{message}</p>
    </div>
    
    <button 
      type="button"
      class="variant-filled-primary alert-actions btn"
      onclick={onClose}
    >
      <X />
    </button>
  </aside>
{/snippet}