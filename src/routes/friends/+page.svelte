<script lang="ts">
  import Tab from '$lib/components/Tab.svelte'
  import ListUsers from '$lib/components/ListUsers.svelte'
  import { onMount } from 'svelte'
  import API from '$lib/api/Interceptor'
  import { FRIEND_API, USER_API } from '$lib/api/API-Endpoint'
  import { getCurrentSessionUser } from '$lib/service/login'
  import { MESSAGE } from '$lib/constants/message'
  import ConfirmationDialog from '$lib/components/ConfirmationDialog.svelte'

  let tabIndex = 0
  let friends: any = []
  let users: any = []
  let pendings: any = []
  let searchText: string = ''
  let currentUser: any = {}
  let listPendingIds: any = []
  let showDialog = false

  onMount(async () => {
    currentUser = await getCurrentSessionUser()
    await getPendingFriends()
  })

  const searchFriend = async () => {
    users = (await API.get(USER_API.searchUsers.replace('{text}', searchText)))
      .data
    users = users.filter(
      (item: any) =>
        item.id != currentUser.id &&
        !friends.some((friend: any) => friend.id == item.id) &&
        !pendings.some((friend: any) => friend.id == item.id)
    )
  }

  const getFriends = async () => {
    friends = (await API.get(FRIEND_API.getFriends)).data.friends
    friends = friends.filter((item: any) => item.id != currentUser.id)
  }

  const getPendingFriends = async () => {
    pendings = (await API.get(FRIEND_API.getPendingFriends)).data.friends
  }

  const makeFriend = async (user: any) => {
    await API.post(
      FRIEND_API.makeFriend.replace('{friend_id}', user.id),
      '',
      MESSAGE.SUCCESS_MAKE_FRIEND
    )
    listPendingIds.push(user.id)
    users = users
    listPendingIds = listPendingIds
  }

  const acceptFriend = async (user: any) => {
    await API.put(
      FRIEND_API.acceptFriend.replace('{friend_id}', user.id),
      '',
      MESSAGE.SUCCESS_ACCEPT_FRIEND
    )
    getPendingFriends()
  }

  let declinedFriend: any = null
  const declineFriend = async () => {
    let res = await API.delete(
      FRIEND_API.removeFriend.replace('{friend_id}', declinedFriend.id),
      '',
      MESSAGE.SUCCESS_DECLINE_FRIEND
    )
    getPendingFriends()
    getFriends()
    return res
  }

  const showConfirmationDecline = (user: any) => {
    declinedFriend = user
    showDialog = true
  }

  $: tabIndex == 0 && getFriends()
  $: tabIndex == 1 && searchFriend()
  $: tabIndex == 2 && getPendingFriends()
</script>

<svelte:head>
  <title>Friends</title>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.bundle.min.js"
  ></script>
</svelte:head>

<div class="content">
  <Tab
    bind:tabIndex
    tabs={[
      { name: 'Total Friends: ' + friends?.length },
      { name: 'Make a New Friend' },
      { name: 'Pending Requests', notify: pendings?.length }
    ]}
  ></Tab>
  <div class="main-container">
    {#if tabIndex == 0}
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-6">
          <ListUsers
            buttons={[
              {
                label: 'Unfriend',
                style: 'btn-danger',
                handler: showConfirmationDecline
              }
            ]}
            users={friends}
            ableViewProfie={true}
            emptyText="You don't have friend, please make new friends to have good contact with them"
          ></ListUsers>
        </div>
        <!-- end col -->
      </div>
    {/if}
    {#if tabIndex == 1}
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-6 padding-box">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default"
              >Search</span
            >
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              bind:value={searchText}
              on:change={searchFriend}
            />
          </div>
        </div>
      </div>
      <div class="row" style="margin-left: 10px;">Suggestions:</div>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-6">
          <!-- Personal-Information -->
          <ListUsers
            {users}
            ableViewProfie={true}
            buttons={[
              {
                label: 'Make friend',
                style: 'btn-primary',
                handler: makeFriend
              }
            ]}
            emptyText="No user found, please enter other names"
            excludeActionItems={listPendingIds}
            showOnlineStatus={false}
          ></ListUsers>
        </div>
        <!-- end col -->
      </div>
    {/if}
    {#if tabIndex == 2}
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-6">
          <ListUsers
            users={pendings}
            ableViewProfie={true}
            buttons={[
              { label: 'Accept', style: 'btn-primary', handler: acceptFriend },
              {
                label: 'Decline',
                style: 'btn-danger',
                handler: showConfirmationDecline
              }
            ]}
            emptyText="You don't have pending friend request"
            showOnlineStatus={false}
          ></ListUsers>
        </div>
      </div>
    {/if}
    <!-- end row -->
  </div>
  <!-- container -->
</div>
<ConfirmationDialog
  bind:show={showDialog}
  message="Would you like to remove this friend?"
  onConfirm={declineFriend}
/>

<style>
  .content {
    padding: 10px;
    background-color: white;
  }

  .card-box {
    padding: 20px;
    border-radius: 3px;
    margin-bottom: 30px;
    background-color: #fff;
  }
  .inbox-widget .inbox-item img {
    width: 40px;
  }

  .inbox-widget .inbox-item {
    border-bottom: 1px solid #f3f6f8;
    overflow: hidden;
    padding: 10px 0;
    position: relative;
  }

  .inbox-widget .inbox-item .inbox-item-img {
    display: block;
    float: left;
    margin-right: 15px;
    width: 40px;
  }

  .inbox-widget .inbox-item img {
    width: 40px;
  }

  .inbox-widget .inbox-item .inbox-item-author {
    color: #313a46;
    display: block;
    margin: 0;
  }

  .inbox-widget .inbox-item .inbox-item-text {
    color: #98a6ad;
    display: block;
    font-size: 14px;
    margin: 0;
  }

  .inbox-widget .inbox-item .inbox-item-date {
    color: #98a6ad;
    font-size: 11px;
    position: absolute;
    right: 7px;
    top: 12px;
  }

  .padding-box {
    padding: 20px 20px 0px 20px;
  }
</style>
