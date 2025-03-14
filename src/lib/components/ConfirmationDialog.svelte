<script lang="ts">
  import { loader } from '$lib/components/loader/loader'
  export let show = false
  export let message = 'Are you sure you want to proceed?'
  export let onConfirm: any = null
  export let onCancel = () => {}

  async function handleConfirm() {
    loader.showLoader();
    const res = await onConfirm()
    loader.hideLoader();
    if (res) {
      show = false // hide the dialog after confirmation
    }
  }

  function handleCancel() {
    onCancel()
    show = false // hide the dialog on cancel
  }
</script>

{#if show}
  <!-- Modal -->
  <div
    class="modal fade show"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="false"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            on:click={handleCancel}
          >
            <span aria-hidden="false">&times;</span>
          </button>
        </div>
        <div class="modal-body">{message}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" on:click={handleConfirm}
            >Ok</button
          >
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            on:click={handleCancel}>Close</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal.show {
    display: block;
  }
</style>
