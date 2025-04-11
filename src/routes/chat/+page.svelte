<script lang="ts">
  import { getlistFriends } from '$lib/service/user'
  import { getCurrentSessionUser } from '$lib/service/login'
  import { onMount, onDestroy } from 'svelte'
  import Avatar from '$lib/components/Avatar.svelte'
  import { WebSocketClient } from '$lib/service/web-socket-client'
  import { WEBSOCKET } from '$lib/api/API-Endpoint'
  import API from '$lib/api/Interceptor'
  import { FRIEND_API } from '$lib/api/API-Endpoint'
  import ReactionPicker from './ReactionPicker.svelte'
  import {
    formatDateTime,
    isImage,
    isVideo,
    getFileIcon,
    getFileNameFromUrl
  } from '$lib/utils/common'
  import { MESSAGE_TYPE } from '$lib/constants/constants'

  let friends: any = []
  let filterFriends: any = []
  let selectedPerson: any = null
  let conversation: any = []
  let currentUser = getCurrentSessionUser()
  let searchText = ''
  let wsClient: any
  let message = ''
  let group_id = '1'

  onMount(async () => {
    await getFriends()
    // friends[0].unread = 5
    // friends[1].unread = 2
    if (friends.length > 0) {
      selectedPerson = friends[0]
    }
    filterFriends = friends

    wsClient = new WebSocketClient(
      WEBSOCKET.connect.replace('{id}', currentUser.id),
      onMessage
    )

    //
  })

  const getFriends = async () => {
    friends = (await API.get(FRIEND_API.getFriends)).data.friends
    friends = friends.filter((item: any) => item.id != currentUser.id)
  }

  onDestroy(async () => {
    wsClient.closeConnection()
  })

  const onMessage = async (data: any) => {
    console.log('Message from server:', data)
    const msg = JSON.parse(data)
    if (msg.message_type == MESSAGE_TYPE.REACTION) {
      let message = conversation.find(
        (item: any) => item.message_id == msg.message_id
      )
      if (message) {
        updateReaction(msg.reaction, message)
      }
    } else {
      conversation.push(msg)
    }
    conversation = conversation
  }

  const searchFriend = () => {
    let res: any = []
    let text = searchText.toLowerCase()
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].full_name.toLowerCase().indexOf(text) >= 0) {
        res.push(friends[i])
      }
    }
    filterFriends = res
  }

  $: selectedPerson && getChatConversation()

  function sumCountsByName(items: any[]): any[] {
    const map = new Map<string, number>()

    for (const item of items) {
      const current = map.get(item.reaction) || 0
      map.set(item.reaction, current + item.count)
    }

    return Array.from(map.entries()).map(([reaction, count]) => ({
      reaction,
      count
    }))
  }

  const getChatConversation = async () => {
    let res = await API.get(
      WEBSOCKET.getConversation.replace('{group_id}', group_id)
    )
    conversation = res.data.sort(
      (a: any, b: any) =>
        new Date(a.time).getTime() - new Date(b.time).getTime()
    )

    conversation.forEach((message: any) => {
      message.reactions = sumCountsByName(message.reactions)
    })
  }

  let file: any = null
  let isDragOver = false

  const handleDrop = (event: any) => {
    event.preventDefault()
    isDragOver = false

    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) {
      file = droppedFile
    }
  }

  const handleDragOver = (event: any) => {
    event.preventDefault()
    isDragOver = true
  }

  const handleDragLeave = () => {
    isDragOver = false
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Prevent newline
      send()
    }
  }

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    const selectedFile = input.files?.[0]
    if (selectedFile) {
      file = selectedFile
    }
  }

  const triggerFileSelect = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement
    fileInput.click()
  }

  const send = async () => {
    //send file
    if (file) {
      let message_type = MESSAGE_TYPE.FILE
      if (isImage(file)) {
        message_type = MESSAGE_TYPE.IMAGE
      } else if (isVideo(file)) {
        message_type = MESSAGE_TYPE.VIDEO
      }
      console.log('Sending file:', file.name)

      const urlFile = await API.fileRequest(file)

      const msg = {
        message: urlFile,
        group_id: group_id,
        message_type: message_type,
        time: new Date().toString(),
        person: {
          id: currentUser.id,
          full_name: currentUser.full_name,
          avatar_url: currentUser.avatar_url
        }
      }

      wsClient.sendMessage(msg)
      conversation.push(msg)
      conversation = conversation

      // Upload or send file...
      file = null
    }

    //send message
    message = message.trim()
    if (message) {
      const msg = {
        message: message,
        group_id: group_id,
        message_type: MESSAGE_TYPE.TEXT,
        time: new Date().toString(),
        person: {
          id: currentUser.id,
          full_name: currentUser.full_name,
          avatar_url: currentUser.avatar_url
        }
      }
      wsClient.sendMessage(msg)

      conversation.push(msg)
      conversation = conversation

      message = ''
    }
  }

  const updateReaction = (icon: string, message: any) => {
    if (!message.reactions) {
      message.reactions = []
    }
    let existing = message.reactions.find((item: any) => item.reaction === icon)
    if (existing) {
      existing.count++
    } else {
      message.reactions.push({
        avatar_url: currentUser.avatar_url,
        count: 1,
        full_name: currentUser.full_name,
        id: 1,
        reaction: icon
      })
    }
  }

  const react = (icon: string, message: any) => {
    wsClient.sendMessage({
      group_id: group_id,
      message_id: message.message_id,
      message_type: MESSAGE_TYPE.REACTION,
      reaction: icon
    })

    updateReaction(icon, message)

    conversation = conversation
  }

  const removeFile = () => {
    file = null
  }

  const downloadFile = (url: string) => {
    const link = document.createElement('a')
    link.href = url
    //link.download = url;
    link.click()
  }
</script>

<svelte:head>
  <title>Chatbox</title>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min.js"
  ></script>
</svelte:head>

<main id="chat-container" class="content">
  <div class="p-0">
    <div class="card">
      <div class="row g-0">
        <div id="left-content" class="col-12 col-lg-5 col-xl-3 border-right">
          <div class="px-4 d-none d-md-block">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <input
                  type="text"
                  class="form-control my-3"
                  placeholder="Search..."
                  bind:value={searchText}
                  on:change={searchFriend}
                />
              </div>
            </div>
          </div>

          <!-- svelte-ignore a11y_no_static_element_interactions -->
          {#if filterFriends.length <= 0}
            <span class="no-friend">No friend found</span>
          {/if}
          {#each filterFriends as friend}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="list-group-item list-group-item-action border-0"
              class:selected-chat={selectedPerson?.id == friend.id}
              on:click={() => {
                if (selectedPerson.id != friend.id) {
                  selectedPerson = friend
                }
              }}
            >
              {#if friend.unread}
                <div class="badge bg-success float-right">{friend.unread}</div>
              {/if}
              <div class="d-flex align-items-start">
                <Avatar user={friend}></Avatar>
                <div class="flex-grow-1 ml-3">
                  {friend.full_name}
                  <div class="small">
                    <span class="fas fa-circle chat-online"></span>
                    {friend.is_active ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
            </div>
          {/each}
          <hr class="d-block d-lg-none mt-1 mb-0" />
        </div>
        <div id="right-content" class="col-12 col-lg-7 col-xl-9">
          <div class="py-2 px-4 border-bottom d-none d-lg-block">
            <div class="d-flex align-items-center py-1">
              <div class="position-relative">
                {#if selectedPerson}
                  <Avatar user={selectedPerson}></Avatar>
                {/if}
              </div>
              <div class="flex-grow-1 pl-3">
                <strong>{selectedPerson?.full_name}</strong>
                <div class="text-muted small"><em>Typing...</em></div>
              </div>
            </div>
          </div>

          <div id="message-container" class="position-relative">
            <div class="chat-messages p-4">
              {#each conversation as item}
                <div
                  class="pb-4"
                  class:chat-message-right={item.person.id == currentUser.id}
                  class:chat-message-left={item.person.id != currentUser.id}
                >
                  <div>
                    <Avatar user={item.person}></Avatar>
                  </div>
                  <div
                    class="flex-shrink-1 rounded py-2 px-3 bg-light"
                    class:mr-3={item.person.id == currentUser.id}
                    class:ml-3={item.person.id != currentUser.id}
                  >
                    {#if item.message_type == MESSAGE_TYPE.TEXT}
                      {item.message}
                    {:else if item.message_type == MESSAGE_TYPE.IMAGE}
                      <!-- svelte-ignore a11y_img_redundant_alt -->
                      <img
                        src={item.message}
                        alt="chat image"
                        class="chat-image"
                      />
                    {:else if item.message_type == MESSAGE_TYPE.VIDEO}
                      <!-- svelte-ignore a11y_media_has_caption -->
                      <video controls class="chat-video">
                        <source src={item.message} />
                        Your browser does not support the video tag.
                      </video>
                    {:else}
                      <!-- svelte-ignore a11y_click_events_have_key_events -->
                      <!-- svelte-ignore a11y_no_static_element_interactions -->
                      <div
                        class="attachment"
                        on:click={() => downloadFile(item.message)}
                      >
                        <span style="color: {getFileIcon(item.message).color}"
                          ><svelte:component
                            this={getFileIcon(item.message).icon}
                            size="20"
                          /></span
                        >

                        {getFileNameFromUrl(item.message)}
                      </div>
                    {/if}
                    <div class="text-muted small text-nowrap mt-2">
                      {formatDateTime(item.time)}
                    </div>
                    <div class="reaction">
                      <div>
                        {#each item.reactions as reaction}
                          <span class="heart-icon">{reaction.reaction}</span>
                          <span class="reaction-count">{reaction.count}</span>
                        {/each}
                      </div>
                      <ReactionPicker handler={react} message={item}
                      ></ReactionPicker>
                    </div>
                    <div class="reaction-popup"></div>
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <div class="flex-grow-0 py-3 px-4 border-top">
            <div class="input-group">
              <div class="input-wrapper" class:dragover={isDragOver}>
                <textarea
                  class:dragover={isDragOver}
                  bind:value={message}
                  placeholder="Type your message or drop a file..."
                  on:drop={handleDrop}
                  on:dragover={handleDragOver}
                  on:dragleave={handleDragLeave}
                  on:keydown={handleKeyDown}
                ></textarea>

                <button
                  class="file-button"
                  on:click={triggerFileSelect}
                  type="button"
                >
                  📁
                </button>
                <!-- Hidden file input -->
                <input
                  id="fileInput"
                  type="file"
                  class="hidden"
                  on:change={handleFileChange}
                />
                {#if file}
                  <div class="file-preview">
                    📎 {file.name}
                    <button class="remove-button" on:click={removeFile}
                      >×</button
                    >
                  </div>
                {/if}
                <button
                  class="btn btn-primary"
                  on:click={send}
                  disabled={!message && !file}>Send</button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .chat-online {
    color: #34ce57;
  }

  .chat-offline {
    color: #e4606d;
  }

  .chat-messages {
    display: flex;
    flex-direction: column;
  }

  .chat-message-left,
  .chat-message-right {
    display: flex;
    flex-shrink: 0;
  }

  .chat-message-left {
    margin-right: auto;
  }

  .chat-message-right {
    flex-direction: row-reverse;
    margin-left: auto;
  }
  .py-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .px-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }
  .flex-grow-0 {
    flex-grow: 0 !important;
  }
  .border-top {
    border-top: 1px solid #dee2e6 !important;
  }

  #message-container {
    background-color: #ebecf0;
    max-height: calc(100vh - 200px); /* Adjusting for a 60px header */
    height: calc(100vh - 200px); /* Adjusting for a 60px header */
    overflow-y: auto;
  }

  .chat-message-left .rounded {
    background-color: #ffffff !important;
    border: 1px solid transparent;
    border-radius: 6px;
    box-shadow:
      rgba(21, 39, 71, 0.25) 0px 0px 1px 0px,
      rgba(21, 39, 71, 0.25) 0px 1px 1px 0px;
  }

  .chat-message-right .rounded {
    background-color: #dbebff !important;
    border: 1px solid transparent;
    border-radius: 6px;
    box-shadow:
      rgba(21, 39, 71, 0.25) 0px 0px 1px 0px,
      rgba(21, 39, 71, 0.25) 0px 1px 1px 0px;
  }

  #right-content {
    padding-left: 0px;
  }

  #left-content {
    padding-right: 0px;
    max-height: calc(100vh - 10px);
    overflow-y: auto;
  }

  .selected-chat {
    background-color: #dbebff !important;
  }

  #chat-container {
    overflow: hidden;
    max-height: calc(100vh - 10px);
  }

  .input-wrapper {
    position: relative;
    width: 100%;
    display: inline-flex;
  }

  textarea {
    width: calc(100% - 61px);
    height: 100px;
    padding: 1rem;
    border: 2px dashed #ccc;
    transition:
      border-color 0.3s,
      background-color 0.3s;
    resize: none;
  }

  textarea.dragover {
    border-color: #4caf50;
    background-color: #f0fff0;
  }

  .file-preview {
    position: absolute;
    bottom: 0.5rem;
    left: 3rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f0f0f0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  .remove-button {
    background: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
    color: #d00;
  }

  .reaction {
    position: relative;
    text-align: right;
  }

  .file-button {
    position: absolute;
    top: 60px;
    left: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
  }

  .file-button:hover {
    opacity: 0.7;
  }

  .hidden {
    display: none;
  }

  .chat-image {
    max-width: 100%;
    border-radius: 5px;
    width: 200px;
  }

  .chat-video {
    width: 100%;
    border-radius: 5px;
    width: 200px;
  }
  .attachment {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #007bff;
    cursor: pointer;
    user-select: none;
  }

  .attachment:hover {
    text-decoration: underline;
  }

  .no-friend {
    padding-left: 30px;
  }
</style>
