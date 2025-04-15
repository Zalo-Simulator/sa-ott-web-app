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

<div class="groups__img">
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

<style>
  .groups__img {
    width: 60px;
    height: 60px;
    display: inline-block;
    border-radius: 50%;
    padding-top: 10px;
  }

  .avatar-char,
  .avatar-img {
    border-radius: 2px;
    width: 30px;
    height: 30px;
  }

  .avatar-char {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.08);
  }

  .avatar-char {
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    font-style: normal;
  }
</style>
