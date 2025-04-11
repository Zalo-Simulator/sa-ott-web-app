<script lang="ts">
  import Tab from '$lib/components/Tab.svelte'
  import ListUsers from '$lib/components/ListUsers.svelte'
  import { getColorByText } from '$lib/utils/common'
  import { onMount } from 'svelte'
  import { MESSAGE } from '$lib/constants/message'
  import { getCurrentSessionUser } from '$lib/service/login'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import API from '$lib/api/Interceptor'
  import { FRIEND_API, GROUP_API } from '$lib/api/API-Endpoint'
  import { GROUP_TYPE } from '$lib/constants/constants'

  let tabIndex = 0
  let groups: any = []
  let users: any = []
  let friends: any = []

  let searchText: string = ''
  const MIN_NUM_MEMBERS = 3
  let currentUser: any = {}
  let groupId = $page.params.id
  let selectedGroup = {
    id: 0,
    name: '',
    members: [currentUser]
  }

  onMount(async () => {
    currentUser = await getCurrentSessionUser()
    if (groupId) {
      selectedGroup = (
        await API.get(GROUP_API.getGroup.replace('{id}', groupId))
      ).data
      selectedGroup.members.forEach((member: any) => {
        member.full_name = member.name
      })
      if (selectedGroup) {
        tabIndex = 1
      }
    }
  })

  const getlistGroups = async () => {
    groups = (await API.get(GROUP_API.getGroups)).data.groups
    groups = groups.filter((item: any) => item.type == GROUP_TYPE.GROUP)
    groups.forEach((group: any) => {
      group.members.forEach((member: any) => {
        member.full_name = member.name
      })
    })
  }

  const getListFriends = async () => {
    friends = (await API.get(FRIEND_API.getFriends)).data.friends
    friends = friends.filter((item: any) => item.id != currentUser.id)
    filterListFriends()
  }

  const filterListFriends = async () => {
    const idsInMember = new Set(
      selectedGroup.members.map((item: any) => item.id)
    )
    users = friends.filter((item: any) => !idsInMember.has(item.id))
    let res = []
    let text = searchText.toLowerCase()
    for (let i = 0; i < users.length; i++) {
      if (users[i].full_name.toLowerCase().indexOf(text) >= 0) {
        res.push(users[i])
      }
    }
    users = res
  }

  $: tabIndex == 0 && getlistGroups()
  $: tabIndex == 1 && getListFriends()

  const addUser = (user: any) => {
    selectedGroup.members.push(user)
    selectedGroup.members = selectedGroup.members
    filterListFriends()
  }

  const removeUser = (user: any) => {
    selectedGroup.members = selectedGroup.members.filter(
      (item: any) => item.id !== user.id
    )
    filterListFriends()
  }

  const updateGroup = async () => {
    //Update group
    if (selectedGroup.id) {
      await API.put(
        GROUP_API.updateGroup.replace('{id}', selectedGroup.id.toString()),
        {
          name: selectedGroup.name,
          avatar_url: '1'
          // member_ids: selectedGroup.members.map((item: any) => item.id),
        }
      )
    }
    //Create new group
    else {
      await API.post(GROUP_API.createGroup, {
        name: selectedGroup.name,
        member_ids: selectedGroup.members.map((item: any) => item.id),
        type: GROUP_TYPE.GROUP
      })
    }
  }

  const viewGroup = (group: any) => {
    goto(`/groups/${group.id}`)
    selectedGroup = group
    tabIndex = 1
  }

  $: groups && calcluateBackground()

  const calcluateBackground = () => {
    for (let group of groups) {
      for (let index = 0; index < group.members.length; index++) {
        if (index >= 4) break
        let member = group.members[index]
        if (!member.avatar_url) {
          member.background = getColorByText(member.full_name)
        }
      }
    }
  }

  $: validationGroup =
    !!selectedGroup.name && selectedGroup.members.length >= MIN_NUM_MEMBERS
</script>

<svelte:head>
  <title>Groups</title>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.1/dist/js/bootstrap.bundle.min.js"
  ></script>
</svelte:head>

<div class="content__inner">
  <Tab
    bind:tabIndex
    tabs={['Total Groups: ' + groups.length, 'Create/Edit a Group']}
  ></Tab>
  {#if tabIndex == 0}
    <div class="row groups">
      {#if groups.length <= 0}
        <div class="no-group">
          You don't have any group, let create groups with your friends
        </div>
      {/if}
      {#each groups as group}
        <div class="col-xl-2 col-lg-3 col-sm-4 col-6">
          <div class="groups__item">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              on:click={() => {
                viewGroup(group)
              }}
              class="group-hover"
            >
              <div class="groups__img">
                {#each group.members as member, index}
                  {#if index < 4}
                    {#if member.avatar_url}
                      <img class="avatar-img" src={member.avatar_url} alt="" />
                    {:else}
                      <div
                        class="avatar-img avatar-char"
                        style="background: {member.background}"
                      >
                        {member.full_name[0].toUpperCase()}
                      </div>
                    {/if}
                  {/if}
                {/each}
              </div>

              <div class="groups__info">
                <strong>{group.name}</strong>
                <small>{group.members.length} Members</small>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  {#if tabIndex == 1}
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-6">
        <div class="row padding-box">
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
              on:change={filterListFriends}
            />
          </div>
        </div>
        <div class="row" style="margin-left: 10px;">Suggestions:</div>
        <div class="row">
          <div class="col-sm-12">
            <ListUsers
              {users}
              buttons={[
                { label: 'Add', style: 'btn-primary', handler: addUser }
              ]}
              emptyText="No friend found"
            ></ListUsers>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-md-12 col-lg-6">
        <div class="row padding-box">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Enter group name"
              bind:value={selectedGroup.name}
              class:is-invalid={!selectedGroup.name}
            />
            <div class="invalid-feedback">
              {MESSAGE.ERROR_GROUP_NAME_NOT_VALID}
            </div>
          </div>
        </div>
        <div class="row" style="margin-left: 10px;">
          <div
            class:is-invalid={selectedGroup.members.length < MIN_NUM_MEMBERS}
          >
            Selected Members:
          </div>
          <div class="invalid-feedback">
            {MESSAGE.ERROR_MEMBERS_NOT_VALID}
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <ListUsers
              users={selectedGroup.members}
              excludeActionItems={[currentUser.id]}
              buttons={[
                { label: 'Remove', style: 'btn-warning', handler: removeUser }
              ]}
            ></ListUsers>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="d-flex justify-content-end col-sm-12">
              <button
                class="btn btn-primary"
                disabled={!validationGroup}
                on:click={updateGroup}
              >
                {selectedGroup.id ? 'Update Group' : 'Create Group'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .content__inner {
    padding: 20px;
    height: 100%;
  }
  .groups__item,
  :global(.messages) {
    background-color: rgba(52, 146, 235, 0.2);
    border-radius: 2px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }

  .row.groups {
    padding-top: 20px;
  }

  @media (max-width: 575px) {
    .groups {
      margin: 0 -5px;
    }
    .groups [class*='col-'] {
      padding: 0 5px;
    }
    .groups .groups__item {
      margin-bottom: 10px;
    }
  }

  .groups__item {
    position: relative;
    text-align: center;
    padding: 2rem 1rem 1.5rem;
    margin-bottom: 30px;
  }

  .groups__img {
    width: 6.5rem;
    display: inline-block;
  }

  .groups__img .avatar-img {
    display: inline-block;
    margin: 0 1px 4px 0;
    vertical-align: top;
    border-radius: 50%;
  }

  .avatar-char,
  .avatar-img {
    border-radius: 2px;
    width: 3rem;
    height: 3rem;
    margin-right: 1.2rem;
  }

  .avatar-char {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.08);
  }

  .avatar-char {
    line-height: 2.9rem;
    font-size: 1.2rem;
    text-align: center;
    font-style: normal;
  }

  .groups__info {
    margin-top: 1rem;
  }

  .groups__info > strong {
    color: #222;
    display: block;
    font-weight: 600;
  }

  :global(.messages, .messages__body) {
    display: -webkit-box;
    display: -ms-flexbox;
    -webkit-box-direction: normal;
  }

  .groups__info > small {
    font-size: 0.9rem;
    color: #222;
  }

  .padding-box {
    padding: 20px 20px 0px 20px;
  }

  .group-hover {
    cursor: pointer;
  }

  .group-hover:hover {
    text-decoration: underline;
  }

  .no-group {
    padding-left: 20px;
  }
</style>
