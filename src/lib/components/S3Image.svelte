<script lang="ts">
  import { getCachedImageUrl, cacheImageUrl } from '$lib/service/cache'
  import { MEDIA_API } from '$lib/api/API-Endpoint'
  import API from '$lib/api/Interceptor'
  import UserImage from '../../imgs/User Frame Black.png'
  import { checkUrlAccessible } from '$lib/service/file'

  export let s3Token: string
  export let cssClass: string = 'default-image'
  export let defaultImage: any = UserImage

  let imageUrl = ''
  let numError = 0

  $: s3Token && getImageUrl()

  const getImageUrl = async () => {
    imageUrl = await getCachedImageUrl(s3Token)
  }

  const handleError = async () => {
    numError++
    if (numError > 1) {
      imageUrl = defaultImage
      return
    }
    try {
      imageUrl = (
        await API.get(
          MEDIA_API.download.replace('{s3_key}', encodeURIComponent(s3Token)),
          undefined,
          '',
          null,
          true
        )
      ).data.url
      if (imageUrl) {
        cacheImageUrl(s3Token, imageUrl)
      }

      if (!(await checkUrlAccessible(imageUrl))) {
        imageUrl = defaultImage
      }
    } catch (error) {
      imageUrl = defaultImage
    }
  }
</script>

{#if s3Token}
  <!-- svelte-ignore a11y_img_redundant_alt -->
  {#if imageUrl}
    <img
      src={imageUrl}
      alt=""
      loading="lazy"
      on:error={handleError}
      class={cssClass}
    />
  {:else}
    <div class="spinner">Loading image...</div>
  {/if}
{:else}
  <img src={defaultImage} alt="" class={cssClass} />
{/if}

<style>
  .default-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: contain;
  }

  .spinner {
    font-size: 12px;
    color: #999;
  }
</style>
