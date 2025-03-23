<script lang="ts">
  import { getRandomColor } from '$lib/utils/common'
  import { goto } from '$app/navigation'
  export let buttonText = ''
  export let users: any = []
  export let handlerItem: any = null
  export let buttonStyle = 'btn-primary'
  export let excludeActionItems: any = []
  export let ableViewProfie = false

  $: users && calcluateBackground()

  const calcluateBackground = () => {
    for (let user of users) {
      if (!user.avatar_url) {
        user.background = getRandomColor()
      }
    }
  }

  const handlerUserAction = (user: any) => {
    if (handlerItem) {
      handlerItem(user)
    }
  }

  const viewProfile = (user: any) => {
    if (ableViewProfie) {
      goto(`/profile/${user.id}`)
    }
  }
</script>

<div class="card-box ribbon-box">
  <div class="clearfix"></div>
  <div class="inbox-widget">
    {#each users as user}
      <div>
        <div class="inbox-item">
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            class="inbox-item-img"
            class:cursor-pointer={ableViewProfie}
            on:click={() => {
              viewProfile(user)
            }}
          >
            {#if user.avatar_url}
              <img src={user.avatar_url} class="rounded-circle" alt="" />
            {:else}
              <div
                class="letter-rounded-circle"
                style="background-color: {user.background}"
              >
                {user.full_name[0]}
              </div>
            {/if}
          </div>
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
          <p
            class="inbox-item-author"
            class:cursor-pointer={ableViewProfie}
            on:click={() => {
              viewProfile(user)
            }}
          >
            {user.full_name}
          </p>
          <p class="inbox-item-text">
            {user.is_active ? 'Online' : 'Offline'}
          </p>
          <p class="inbox-item-date">
            {#if buttonText && !excludeActionItems.some((item: number) => item == user.id)}
              <button
                type="button"
                class="btn btn-icon btn-sm waves-effect waves-light {buttonStyle}"
                on:click={() => {
                  handlerUserAction(user)
                }}>{buttonText}</button
              >
            {/if}
          </p>
        </div>
      </div>
    {/each}
    {#if users.length <= 0}
      (No data)
    {/if}
  </div>
</div>

<style>
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

  .letter-rounded-circle {
    width: 40px;
    height: 40px;
    /* background-color: #4caf50; Green background */
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    text-transform: uppercase; /* Make sure it's uppercase */
    font-family: Arial, sans-serif;
  }

  .cursor-pointer{
    cursor: pointer;
  }
</style>
