<script lang="ts">
  import { getFileNameFromUrl, isImage, downloadFile } from '$lib/service/file'
  import wordIcon from '../../imgs/word.svg'
  import excelIcon from '../../imgs/excel2.svg'
  import pdfIcon from '../../imgs/pdf.svg'
  import attachmentIcon from '../../imgs/attachment.svg'
  import S3Image from './S3Image.svelte'

  export let s3key
  export let size = 20
  export let isShowName = true
  export let isDownloadable = false
  export let isShowImage = false
  let icon: any
  let type = 'icon'

  $: s3key && init()

  const init = () => {
    const ext = s3key.split('.').pop()?.toLowerCase()

    switch (ext) {
      case 'pdf':
        icon = pdfIcon
        break
      case 'doc':
      case 'docx':
        icon = wordIcon
        break
      case 'xls':
      case 'xlsx':
      case 'csv':
        icon = excelIcon
        break
      default:
        if (isShowImage && isImage(s3key)) {
          type = 'image'
        } else {
          icon = attachmentIcon
        }
        break
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="attachment"
  class:downloadable={isDownloadable}
  on:click={() => {
    if (isDownloadable) {
      downloadFile(s3key)
    }
  }}
>
  {#if type == 'icon'}
    <img src={icon} alt="" style="width: {size}px;" />
  {:else if type == 'image'}
    <S3Image s3Token={s3key} isFullUrl={true}></S3Image>
  {/if}
  {#if isShowName}
    {getFileNameFromUrl(s3key)}
  {/if}
</div>

<style>
  .attachment {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .attachment.downloadable {
    color: #007bff;
    cursor: pointer;
    user-select: none;
  }

  .attachment.downloadable:hover {
    text-decoration: underline;
  }
</style>
