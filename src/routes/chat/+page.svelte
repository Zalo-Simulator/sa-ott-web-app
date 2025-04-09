<script lang="ts">
  import { getlistFriends, getUserbyId } from '$lib/service/user'
  import { getCurrentSessionUser } from '$lib/service/login'
  import { onMount } from 'svelte'
  import Avatar from '$lib/components/Avatar.svelte'

  let friends: any = []
  let filterFriends: any = []
  let selectedPerson: any = null
  let coversation: any = []
  let currentUser = getCurrentSessionUser()
  let searchText = ''

  onMount(async () => {
    friends = getlistFriends()
    friends[0].unread = 5
    friends[1].unread = 2
    selectedPerson = friends[0]
    filterFriends = friends

    //await getUserbyId('3')
  })

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

  const getChatConversation = () => {
    coversation = [
      {
        person: currentUser,
        message:
          'Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.',
        time: '2:33 am'
      },
      {
        person: selectedPerson,
        message:
          'Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.',
        time: '2:34 am'
      },
      {
        person: currentUser,
        message: 'Cum ea graeci tractatos.',
        time: '2:35 am'
      },
      {
        person: selectedPerson,
        message:
          'Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit. Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.',
        time: '2:36 am'
      },
      {
        person: selectedPerson,
        message:
          'Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci.',
        time: '2:37 am'
      },
      {
        person: currentUser,
        message:
          'Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.',
        time: '2:38 am'
      }
    ]
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
              {#each coversation as item}
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
              <input
                type="text"
                class="form-control"
                placeholder="Type your message"
              />
              <button class="btn btn-primary">Send</button>
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
    max-height: calc(100vh - 160px); /* Adjusting for a 60px header */
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
</style>
