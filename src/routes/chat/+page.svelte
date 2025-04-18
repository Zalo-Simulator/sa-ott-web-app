<script lang="ts">
  import { getCurrentSessionUser } from '$lib/service/login'
  import { onMount } from 'svelte'
  import Avatar from '$lib/components/Avatar.svelte'
  import GroupAvatar from '$lib/components/GroupAvatar.svelte'
  import { GROUP_API, WEBSOCKET } from '$lib/api/API-Endpoint'
  import API from '$lib/api/Interceptor'
  import { FRIEND_API } from '$lib/api/API-Endpoint'
  import ReactionPicker from './ReactionPicker.svelte'
  import { formatDateTime, NameTracker } from '$lib/utils/common'
  import { isImage, isVideo } from '$lib/service/file'
  import { MESSAGE_TYPE, stickers, GROUP_TYPE } from '$lib/constants/constants'
  import InView from '$lib/components/InView.svelte'
  import S3Image from '$lib/components/S3Image.svelte'
  import S3Video from '$lib/components/S3Video.svelte'
  import {
    getAllPrivateGroupIds,
    cachePrivateGroupId
  } from '$lib/service/cache'
  import FileIcon from '$lib/components/FileIcon.svelte'
  import { wsClient } from '$lib/service/store'

  let friends: any = []
  let groups: any = []
  let filterFriends: any = []
  let filterGroups: any = []
  let selectedPerson: any
  let selectedGroup: any
  let conversation: any = []
  let currentUser: any = {}
  let searchText = ''
  let message = ''
  let group_id = ''
  let container: HTMLDivElement
  let NUM_MESSAGE = 10
  let numMessage = 0
  let isStillLoadMore = false
  const tracker = new NameTracker()
  let peopleTyping = ''

  onMount(async () => {
    currentUser = await getCurrentSessionUser()

    getFriends()

    getlistGroups()

    wsClient.subscribe((socket) => {
      if (socket) {
        socket.setMessageHandler(receiveMessage)
      }
    })

    if ($wsClient) {
      $wsClient.setMessageHandler(receiveMessage)
    }
  })

  const getFriends = async () => {
    friends = (await API.get(FRIEND_API.getFriends)).data.friends
    friends = friends.filter((item: any) => item.id != currentUser.id)

    if (friends.length > 0) {
      selectPerson(friends[0])
    }
    filterFriends = friends
  }

  const getlistGroups = async () => {
    groups = (await API.get(GROUP_API.getGroups, undefined, '', null, true))
      .data.groups
    groups = groups.filter((item: any) => item.type == GROUP_TYPE.GROUP)
    groups.forEach((group: any) => {
      group.members.forEach((member: any) => {
        member.full_name = member.full_name || member.name
      })
    })

    filterGroups = groups
  }

  const searchFriendGroup = () => {
    let res: any = []
    let text = searchText.toLowerCase()
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].full_name.toLowerCase().indexOf(text) >= 0) {
        res.push(friends[i])
      }
    }
    filterFriends = res

    //groups
    res = []
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].name.toLowerCase().indexOf(text) >= 0) {
        res.push(groups[i])
      }
    }
    filterGroups = res
  }

  const selectPerson = async (person: any) => {
    selectedPerson = person
    person.unread = 0
    selectedGroup = null
    if (selectedPerson.group_id) {
      group_id = selectedPerson.group_id
    } else {
      group_id = (
        await API.get(
          GROUP_API.getPrivateGroup.replace('{friend_id}', selectedPerson.id)
        )
      ).data.id
      selectedPerson.group_id = group_id
      cachePrivateGroupId(selectedPerson.id, group_id)
    }

    numMessage = 0
    getChatConversation()
    filterFriends = filterFriends
  }

  const selectGroup = async (group: any) => {
    selectedGroup = group
    group.unread = 0
    selectedPerson = null
    group_id = group.id

    numMessage = 0
    getChatConversation()
    filterGroups = filterGroups
  }

  const sumCountsByName = (items: any[]): any[] => {
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
    numMessage += NUM_MESSAGE
    let res = await API.get(
      WEBSOCKET.getConversation
        .replace('{group_id}', group_id)
        .replace('{num_message}', numMessage.toString())
    )
    conversation = res.data.sort(
      (a: any, b: any) =>
        new Date(a.time).getTime() - new Date(b.time).getTime()
    )

    conversation.forEach((message: any) => {
      message.reactions = sumCountsByName(message.reactions)
    })

    setTimeout(() => {
      if (conversation.length < numMessage) {
        isStillLoadMore = false
      } else {
        isStillLoadMore = true
      }
    }, 10)

    if (numMessage == NUM_MESSAGE) {
      setTimeout(scrollToBottom, 10)
    }
  }

  const receiveMessage = async (data: any) => {
    console.log('on receiveMessage')
    const msg = JSON.parse(data)

    if (msg.group_id == group_id) {
      switch (msg.message_type) {
        case MESSAGE_TYPE.TYPING:
          tracker.add(msg.person.full_name)
          peopleTyping = tracker.list()
          break
        case MESSAGE_TYPE.STOP_TYPING:
          tracker.remove(msg.person.full_name)
          peopleTyping = tracker.list()
          break
        case MESSAGE_TYPE.REACTION:
          let message = conversation.find(
            (item: any) => item.message_id == msg.message_id
          )
          if (!message) {
            message = conversation.find(
              (item: any) => item.message == msg.message && !item.message_id
            )
          }
          if (message) {
            updateReaction(msg.reaction, message)
            if (!message.message_id) {
              message.message_id = msg.message_id
            }
          }
          break

        default:
          conversation.push(msg)
          break
      }

      conversation = conversation

      setTimeout(scrollToBottom, 100)
    } else {
      let selectedItem
      if (msg.is_group === true) {
        selectedItem = groups.find((item: any) => {
          return item.id == msg.group_id
        })
        if (selectedItem) {
          selectedItem.unread = selectedItem.unread
            ? selectedItem.unread + 1
            : 1
        }
        filterGroups = filterGroups
      } else if (msg.is_group === false) {
        selectedItem = friends.find((item: any) => {
          return item.id == msg.person.id
        })
        if (selectedItem) {
          selectedItem.unread = selectedItem.unread
            ? selectedItem.unread + 1
            : 1
        }
        filterFriends = filterFriends
      }
    }
  }

  const sendMessage = async () => {
    //send file
    if (file) {
      let message_type = MESSAGE_TYPE.FILE
      if (isImage(file)) {
        message_type = MESSAGE_TYPE.IMAGE
      } else if (isVideo(file)) {
        message_type = MESSAGE_TYPE.VIDEO
      }

      const s3Key = await API.fileRequest(file)

      const msg = {
        message: s3Key,
        group_id: group_id,
        message_type: message_type,
        time: new Date().toString(),
        is_group: !!selectedGroup,
        person: {
          id: currentUser.id,
          full_name: currentUser.full_name,
          avatar_url: currentUser.avatar_url
        }
      }

      $wsClient.sendMessage(msg)
      conversation.push(msg)

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
        is_group: !!selectedGroup,
        person: {
          id: currentUser.id,
          full_name: currentUser.full_name,
          avatar_url: currentUser.avatar_url
        }
      }
      $wsClient.sendMessage(msg)
      conversation.push(msg)

      message = ''
    }

    showStickers = false
    conversation = conversation
    setTimeout(scrollToBottom, 100)
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
    $wsClient.sendMessage({
      group_id: group_id,
      message_id: message.message_id,
      message: message.message,
      message_type: MESSAGE_TYPE.REACTION,
      reaction: icon
    })

    updateReaction(icon, message)

    conversation = conversation
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
      sendMessage()
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
    showStickers = false
    const fileInput = document.getElementById('fileInput') as HTMLInputElement
    fileInput.click()
  }

  const removeFile = () => {
    file = null
  }

  const scrollToBottom = async () => {
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }

  let showStickers = false

  const selectSticker = (sticker: { type: string; value: string }) => {
    if (sticker.type == 'emoji') {
      message += sticker.value
    } else {
      const msg = {
        message: sticker.value,
        group_id: group_id,
        message_type: MESSAGE_TYPE.STICKER,
        time: new Date().toString(),
        is_group: !!selectedGroup,
        person: {
          id: currentUser.id,
          full_name: currentUser.full_name,
          avatar_url: currentUser.avatar_url
        }
      }

      showStickers = false
      $wsClient.sendMessage(msg)
      conversation.push(msg)
      conversation = conversation
      setTimeout(scrollToBottom, 100)
    }
  }

  //Typing
  let typingTimeout: NodeJS.Timeout | null = null

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const sendTyping = () => {
    // Send typing status to other clients
    const msg = {
      group_id: group_id,
      message_type: MESSAGE_TYPE.TYPING,
      person: {
        full_name: currentUser.full_name
      }
    }
    $wsClient.sendMessage(msg)

    // Reset timer if user is still typing
    if (typingTimeout) clearTimeout(typingTimeout)

    // After 3 seconds of no typing, send stop typing
    typingTimeout = setTimeout(() => {
      const msg = {
        group_id: group_id,
        message_type: MESSAGE_TYPE.STOP_TYPING,
        person: {
          full_name: currentUser.full_name
        }
      }
      $wsClient.sendMessage(msg)
    }, 3000)
  }

  const debouncedSendTyping = debounce(sendTyping, 300)
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
        <div
          id="left-content"
          class="col-3 col-sm-3 col-md-5 col-lg-4 col-xl-3 border-right"
        >
          <div class="px-4 d-md-block">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <input
                  type="text"
                  class="form-control my-3"
                  placeholder="Search..."
                  bind:value={searchText}
                  on:change={searchFriendGroup}
                />
              </div>
            </div>
          </div>

          <!-- svelte-ignore a11y_no_static_element_interactions -->
          {#if filterFriends.length + filterGroups.length <= 0}
            <span class="no-friend">No friend or group found</span>
          {/if}
          {#each filterFriends as friend}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="list-group-item list-group-item-action border-0"
              class:selected-chat={selectedPerson?.id == friend.id}
              on:click={() => {
                if (selectedPerson?.id != friend.id) {
                  selectPerson(friend)
                }
              }}
            >
              {#if friend.unread}
                <div class="badge bg-success float-right">{friend.unread}</div>
              {/if}
              <div class="d-flex align-items-start">
                <Avatar user={friend}></Avatar>
                <div class="flex-grow-1 ml-4 sm-hidden">
                  {friend.full_name}
                  <div class="small">
                    <span
                      class="fas fa-circle"
                      class:chat-online={friend.is_online}
                      class:chat-offline={!friend.is_online}
                    >
                      {friend.is_online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          {/each}
          {#each filterGroups as group}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="list-group-item list-group-item-action border-0"
              class:selected-chat={selectedGroup?.id == group.id}
              on:click={() => {
                if (selectedGroup?.id != group.id) {
                  selectGroup(group)
                }
              }}
            >
              {#if group.unread}
                <div class="badge bg-success float-right">{group.unread}</div>
              {/if}
              <div class="d-flex align-items-start">
                <GroupAvatar users={group.members}></GroupAvatar>
                <div class="flex-grow-1 ml-2 sm-hidden">
                  {group.name}
                  <div class="small">
                    <span class="fas fa-circle chat-online"></span>
                    Group
                  </div>
                </div>
              </div>
            </div>
          {/each}
          <hr class="d-block d-lg-none mt-1 mb-0" />
        </div>
        <div
          id="right-content"
          class="col-9 col-sm-9 col-md-7 col-lg-8 col-xl-9"
        >
          <div class="py-2 px-4 border-bottom d-none d-lg-block">
            <div class="d-flex align-items-center py-1">
              <div class="position-relative">
                {#if selectedPerson}
                  <Avatar user={selectedPerson}></Avatar>
                {/if}
                {#if selectedGroup}
                  <GroupAvatar users={selectedGroup.members}></GroupAvatar>
                {/if}
              </div>
              <div class="flex-grow-1 pl-3">
                <strong
                  >{selectedPerson?.full_name || selectedGroup?.name}</strong
                >
                <div class="text-muted small">
                  <em>
                    {#if peopleTyping}
                      {peopleTyping} typing...
                    {/if}
                  </em>
                </div>
              </div>
            </div>
          </div>

          <div
            id="message-container"
            class="position-relative"
            bind:this={container}
          >
            <InView bind:isStillLoadMore postAction={getChatConversation}
            ></InView>
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
                    {:else if item.message_type == MESSAGE_TYPE.STICKER}
                      <!-- svelte-ignore a11y_img_redundant_alt -->
                      <img
                        src={item.message}
                        alt="chat image"
                        class="chat-image"
                      />
                    {:else if item.message_type == MESSAGE_TYPE.IMAGE}
                      <S3Image
                        s3Token={item.message}
                        cssClass="chat-image"
                        defaultImage={null}
                      ></S3Image>
                    {:else if item.message_type == MESSAGE_TYPE.VIDEO}
                      <S3Video s3Token={item.message} cssClass="chat-video"
                      ></S3Video>
                    {:else}
                      <FileIcon
                        s3key={item.message}
                        isDownloadable={true}
                        size={25}
                      ></FileIcon>
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
                  on:input={debouncedSendTyping}
                ></textarea>

                <button
                  class="file-button"
                  on:click={triggerFileSelect}
                  type="button"
                >
                  📁
                </button>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                  class="icon-button"
                  on:click={() => (showStickers = !showStickers)}
                >
                  😊
                </div>
                {#if showStickers}
                  <div class="sticker-popup">
                    {#each stickers as sticker}
                      <!-- svelte-ignore a11y_click_events_have_key_events -->
                      <!-- svelte-ignore a11y_no_static_element_interactions -->
                      <div
                        class="sticker"
                        on:click={() => selectSticker(sticker)}
                      >
                        {#if sticker.type === 'emoji'}
                          {sticker.value}
                        {:else if sticker.type === 'image'}
                          <img src={sticker.value} alt="sticker" />
                        {/if}
                      </div>
                    {/each}
                  </div>
                {/if}
                <!-- Hidden file input -->
                <input
                  id="fileInput"
                  type="file"
                  class="hidden"
                  on:change={handleFileChange}
                />
                {#if file}
                  <div class="file-preview">
                    <FileIcon s3key={file.name}></FileIcon>
                    <button class="remove-button" on:click={removeFile}
                      >×</button
                    >
                  </div>
                {/if}
                <button
                  class="btn btn-primary"
                  on:click={sendMessage}
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
    left: 90px;
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
    left: 50px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
  }

  .icon-button {
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

  .icon-button:hover {
    opacity: 0.7;
  }

  .hidden {
    display: none;
  }

  .chat-image,
  :global(.chat-image) {
    max-width: 100%;
    border-radius: 5px;
    width: 200px;
  }

  :global(.chat-video) {
    width: 100%;
    border-radius: 5px;
    width: 200px;
  }

  .no-friend {
    padding-left: 30px;
  }

  .sticker-popup {
    position: absolute;
    bottom: 100%;
    left: 10px;
    display: flex;
    flex-wrap: wrap;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    min-width: 50%;
    max-width: 75%;
    overflow: auto;
    z-index: 10;
  }

  .sticker {
    cursor: pointer;
    font-size: 24px;
    margin: 4px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .sticker img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .align-items-start {
    cursor: pointer;
  }

  @media (max-width: 750px) {
    .sm-hidden {
      display: none;
    }

    .list-group-item {
      padding: 0.75em;
    }
  }
</style>
