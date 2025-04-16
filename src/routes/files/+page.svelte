<script lang="ts">
  import FileIcon from '$lib/components/FileIcon.svelte'
  import { downloadFile, getFileNameFromUrl } from '$lib/service/file'
  import { getCurrentSessionUser } from '$lib/service/login'
  import API from '$lib/api/Interceptor'
  import { MEDIA_API } from '$lib/api/API-Endpoint'

  let currentUser: any = {}

  import { onMount } from 'svelte'
  let files: any[] = []
  onMount(async () => {
    currentUser = await getCurrentSessionUser()
    files = (await API.get(MEDIA_API.getAllFiles)).data.urls
    files = files.map((item: any) => {
      return {
        name: getFileNameFromUrl(item.url),
        url: item.url
      }
    })
  })
</script>

<svelte:head>
  <title>Files</title>
  <link
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
    rel="stylesheet"
  />
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.bundle.min.js"
  ></script>
</svelte:head>

<div class="content">
  <div class="main-container">
    <div class="col-12">
      <div class="card-box">
        <div class="row">
          <div class="col-lg-6 col-xl-6">
            <h4 class="header-title m-b-30">My Uploaded Files</h4>
          </div>
        </div>

        <div class="row list-files">
          {#if files.length == 0}
            <span class="no-file"> You don't have any uploaded files!! </span>
          {/if}
          {#each files as file}
            <div class="col-lg-3 col-xl-2 col-md-4 col-sm-6">
              <div class="file-man-box">
                <div class="file-img-box">
                  <FileIcon
                    s3key={file.url}
                    isShowName={false}
                    size={64}
                    isShowImage={true}
                  ></FileIcon>
                </div>
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <a
                  href="#"
                  class="file-download"
                  on:click={() => {
                    downloadFile(file.url, false)
                  }}><i class="fa fa-download"></i></a
                >
                <div class="file-man-title">
                  <h5 class="mb-0 text-overflow" title={file.name}>
                    {file.name}
                  </h5>
                  <p class="mb-0"><small>&nbsp;</small></p>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <!-- end col -->

    <!-- end row -->
  </div>
  <!-- container -->
</div>

<style>
  .card-box {
    padding: 10px;
    border-radius: 3px;
    background-color: #fff;
  }

  .file-man-box {
    padding: 20px;
    border: 1px solid #e3eaef;
    border-radius: 5px;
    position: relative;
    margin-bottom: 20px;
  }

  .file-man-box .file-img-box {
    line-height: 120px;
    text-align: center;
  }

  :global(.file-man-box .file-img-box .attachment) {
    display: inherit;
  }

  :global(.file-man-box .file-img-box img) {
    height: 120px;
  }

  .file-man-box .file-download {
    font-size: 32px;
    color: #98a6ad;
    position: absolute;
    right: 10px;
  }

  .file-man-box .file-download:hover {
    color: #313a46;
  }

  .file-man-box .file-man-title {
    padding-right: 25px;
  }

  .file-man-box:hover {
    -webkit-box-shadow:
      0 0 24px 0 rgba(0, 0, 0, 0.06),
      0 1px 0 0 rgba(0, 0, 0, 0.02);
    box-shadow:
      0 0 24px 0 rgba(0, 0, 0, 0.06),
      0 1px 0 0 rgba(0, 0, 0, 0.02);
  }

  .text-overflow {
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    width: 100%;
    overflow: hidden;
  }
  h5 {
    font-size: 15px;
  }
  .no-file {
    padding: 15px;
  }

  .list-files {
    padding-top: 20px;
  }
</style>
