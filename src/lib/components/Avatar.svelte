<script lang="ts">
  import { getColorByText } from '$lib/utils/common'
  export let user: any
</script>

{#if user.avatar_url}
  <img src={user.avatar_url} class="rounded-circle" alt="" />
{:else}
  <div
    class="letter-rounded-circle"
    style="background-color: {getColorByText(user.full_name)}"
  >
    {user.full_name[0].toUpperCase()}
  </div>
{/if}

<style>
  img {
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
