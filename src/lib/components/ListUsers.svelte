<script lang="ts">
  import { goto } from '$app/navigation'
  import Avatar from '$lib/components/Avatar.svelte'

  export let users: any = []
  export let ableViewProfie = false
  export let emptyText = '(No data)'
  //{label, handler, style}
  export let buttons: any = []
  export let excludeActionItems: any = []

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
            <Avatar {user}></Avatar>
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
            {user.is_online ? 'Online' : 'Offline'}
          </p>
          <p class="inbox-item-date">
            {#if !excludeActionItems.some((item: number) => item == user.id)}
              {#each buttons as button}
                <button
                  type="button"
                  class="btn btn-icon btn-sm waves-effect waves-light {button.style}"
                  on:click={() => {
                    if (button.handler) {
                      button.handler(user)
                    }
                  }}>{button.label}</button
                >
              {/each}
            {/if}
          </p>
        </div>
      </div>
    {/each}
    {#if users.length <= 0}
      {emptyText}
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
  .inbox-item-date button {
    margin-right: 10px;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .cursor-pointer:hover {
    text-decoration: underline;
  }
</style>
