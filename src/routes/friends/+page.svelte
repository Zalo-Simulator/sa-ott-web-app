<script lang="ts">
  import Tab from '$lib/components/Tab.svelte'
  import ListUsers from '$lib/components/ListUsers.svelte'
  import { getlistFriends, searchUsers } from '$lib/service/user'
  import { onMount } from 'svelte'

  let tabIndex = 0
  let friends: any = []
  let users: any = []
  let searchText: string = ''

  onMount(() => {
    friends = getlistFriends()
    users = searchUsers(searchText)
  })

  const searchFriend = () => {
    users = searchUsers(searchText)
  }
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
    tabs={['Total Friends: ' + users.length, 'Make a New Friend']}
  ></Tab>
  <div class="main-container">
    {#if tabIndex == 0}
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-6">
          <ListUsers buttonText="Message" users={friends} ableViewProfie={true}></ListUsers>
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
          <ListUsers buttonText="Make friend" {users} ableViewProfie={true}></ListUsers>
        </div>
        <!-- end col -->
      </div>
    {/if}
    <!-- end row -->
  </div>
  <!-- container -->
</div>

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
