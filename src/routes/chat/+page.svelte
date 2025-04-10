<script lang="ts">
  import { getlistFriends } from '$lib/service/user'
  import { getCurrentSessionUser } from '$lib/service/login'
  import { onMount, onDestroy } from 'svelte'
  import Avatar from '$lib/components/Avatar.svelte'
  import { WebSocketClient } from '$lib/service/web-socket-client'
  import { WEBSOCKET } from '$lib/api/API-Endpoint'
  import API from '$lib/api/Interceptor'

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
    friends = getlistFriends()
    friends[0].unread = 5
    friends[1].unread = 2
    selectedPerson = friends[0]
    filterFriends = friends

    wsClient = new WebSocketClient(
      WEBSOCKET.connect.replace('{id}', currentUser.id),
      onMessage
    )

    //
  })

  onDestroy(async () => {
    wsClient.closeConnection()
  })

  const onMessage = async (data: any) => {
    console.log('Message from server:', data)
    const msg = JSON.parse(data)
    conversation.push(msg)
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

  const getChatConversation = async () => {
    let res = await API.get(
      WEBSOCKET.getConversation.replace('{group_id}', group_id)
    )
    conversation = res.data.sort(
      (a: any, b: any) =>
        new Date(a.time).getTime() - new Date(b.time).getTime()
    )
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

  const send = () => {
    if (file) {
      console.log('Sending file:', file.name)
      // Upload or send file...
      file = null
    }
    message = message.trim()
    if (message) {
      console.log('Sending message:', message.trim())
      const msg = {
        message: message,
        group_id: group_id,
        message_type: 'text',
        time: new Date().toString(),
        person: {
          id: currentUser.id,
          full_name: currentUser.full_name,
          avatar_url: currentUser.avatar_url
        }
      }
      wsClient.sendMessage(msg)

      // wsClient.sendMessage({
      //   group_id: group_id,
      //   message_id: 2,
      //   message_type: 'reaction',
      //   reaction: '👍'
      // })

      conversation.push(msg)
      conversation = conversation

      message = ''
    }
  }

  function removeFile() {
    file = null
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
          {#each filterFriends as friend}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div
              class="list-group-item list-group-item-action border-0"
              class:selected-chat={selectedPerson?.id == friend.id}
              on:click={() => {
                selectedPerson = friend
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
                    {item.message}
                    <div class="text-muted small text-nowrap mt-2">
                      {item.time}
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <div class="flex-grow-0 py-3 px-4 border-top">
            <div class="input-group">
              <!-- <input
                type="text"
                class="form-control"
                placeholder="Type your message"
                bind:value={message}
              /> -->
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
    left: 1rem;
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
</style>
