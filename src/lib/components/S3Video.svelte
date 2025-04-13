<script lang="ts">
  import { getCachedImageUrl, cacheImageUrl } from '$lib/service/cache'
  import { MEDIA_API } from '$lib/api/API-Endpoint'
  import API from '$lib/api/Interceptor'

  export let s3Token: string
  export let cssClass: string = ''

  let videoUrl = ''

  $: s3Token && getvideoUrl()

  const getvideoUrl = async () => {
    videoUrl = await getCachedImageUrl(s3Token)
  }

  const handleError = async () => {
    try {
      videoUrl = (
        await API.get(
          MEDIA_API.download.replace('{s3_key}', encodeURIComponent(s3Token)),
          undefined,
          '',
          null,
          true
        )
      ).data.url
      if (videoUrl) {
        cacheImageUrl(s3Token, videoUrl)
      }
    } catch (error) {}
  }
</script>

{#if s3Token}
  <!-- svelte-ignore a11y_img_redundant_alt -->
  {#if videoUrl}
    <!-- svelte-ignore a11y_media_has_caption -->
    <video controls class={cssClass} on:error={handleError}>
      <source src={videoUrl} />
      Your browser does not support the video tag.
    </video>
  {:else}
    <div class="spinner">Loading video...</div>
  {/if}
{/if}

<style>
  .spinner {
    font-size: 12px;
    color: #999;
  }
</style>
