<script lang="ts">
  import { getColorByText } from '$lib/utils/common'
  import S3Image from '$lib/components/S3Image.svelte'
  export let user: any

  if(!user.full_name) {
    user.full_name = " "
  }
</script>

{#if user.avatar_url}
  <S3Image s3Token={user.avatar_url} cssClass="rounded-circle avatar-small"></S3Image>
{:else}
  <div
    class="letter-rounded-circle"
    style="background-color: {getColorByText(user.full_name)}"
  >
    {user.full_name[0].toUpperCase()}
  </div>
{/if}

<style>
  :global(.avatar-small) {
    width: 40px;
    height: 40px;
  }

  .letter-rounded-circle {
    width: 40px;
    height: 40px;
    /* background-color: #4caf50; Green background */
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    text-transform: uppercase; /* Make sure it's uppercase */
    font-family: Arial, sans-serif;
  }
</style>
