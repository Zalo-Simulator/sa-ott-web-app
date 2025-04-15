<script lang="ts">
  import { getColorByText } from '$lib/utils/common'
  import S3Image from '$lib/components/S3Image.svelte'
  export let users: any

  users.forEach((user: any) => {
    if (!user.full_name) {
      user.full_name = ' '
    }
  })
</script>

<div class="groups-img-small">
  {#each users as user, index}
    {#if index < 4}
      {#if user.avatar_url}
        <S3Image s3Token={user.avatar_url} cssClass="avatar-img"></S3Image>
      {:else}
        <div
          class="avatar-img avatar-char"
          style="background-color: {getColorByText(user.full_name)}"
        >
          {user.full_name[0].toUpperCase()}
        </div>
      {/if}
    {/if}
  {/each}
</div>

