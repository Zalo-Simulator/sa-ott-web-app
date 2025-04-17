<script lang="ts">
  import '../styles/main.css'
  import {
    isUserLoggedIn,
    logOutUserSession,
    getCurrentSessionUser,
    refeshUserSession,
    getUserSession
  } from '$lib/service/login'
  import { goto } from '$app/navigation'
  import { onMount, onDestroy } from 'svelte'
  import { page } from '$app/stores'
  import { pageHomeClass, currentUser, wsClient } from '$lib/service/store'
  import Loader from '$lib/components/loader/Loader.svelte'
  import { SvelteToast } from '@zerodevx/svelte-toast'
  import ConfirmationDialog from '$lib/components/ConfirmationDialog.svelte'
  import UserImage from '../imgs/User Frame.png'
  import API from '$lib/api/Interceptor'
  import { AUTH_API } from '$lib/api/API-Endpoint'
  import S3Image from '$lib/components/S3Image.svelte'
  import { WebSocketClient } from '$lib/service/web-socket-client'
  import { WEBSOCKET } from '$lib/api/API-Endpoint'

  let showDialog = false

  const showConfirmationlogOut = () => {
    showDialog = true
  }

  let hasClickEvent = false

  const showLeftMenu = () => {
    let sidebar = document.querySelector('.sidebar')
    let closeBtn = document.querySelector('#btn')

    if (!hasClickEvent && closeBtn) {
      closeBtn?.addEventListener('click', () => {
        sidebar?.classList.toggle('open')
        menuBtnChange() //calling the function(optional)
        hasClickEvent = true
      })
    }
    // following are the code to change sidebar button(optional)
    function menuBtnChange() {
      if (sidebar?.classList.contains('open')) {
        closeBtn?.classList.replace('bx-menu', 'bx-menu-alt-right') //replacing the iocns class
      } else {
        closeBtn?.classList.replace('bx-menu-alt-right', 'bx-menu') //replacing the iocns class
      }
    }
  }

  const logOut = async () => {
    await API.post(AUTH_API.logout, {})
    logOutUserSession()
    goto('/login').then(() => {
      showDialog = false
      pageHomeClass.set('disable-menu')
    })
  }

  onMount(async () => {
    if (
      !(await isUserLoggedIn()) &&
      $page.url.pathname.toLocaleLowerCase() != '/register' &&
      $page.url.pathname.toLocaleLowerCase() != '/login' &&
      $page.url.pathname.toLocaleLowerCase() != '/reset-password'
    ) {
      goto('/login').then(() => {
        pageHomeClass.set('disable-menu')
      })
    }

    if (await isUserLoggedIn()) {
      currentUser.set(await getCurrentSessionUser())
      const session: any = await getUserSession()
      await wsClient.set(
        new WebSocketClient(
          WEBSOCKET.connect.replace('{id}', $currentUser?.id) +
            `?token=${session.access_token}`
        )
      )
      refeshUserSession()
    }

    pageHomeClass.subscribe(async (val) => {
      if (val == '') {
        showLeftMenu()

        if (!$wsClient) {
          const session: any = await getUserSession()
          wsClient.set(
            new WebSocketClient(
              WEBSOCKET.connect.replace('{id}', $currentUser?.id) +
                `?token=${session.access_token}`
            )
          )
        }
      }
    })
  })

  onDestroy(async () => {
    $wsClient.closeConnection()
  })
</script>

<Loader />
<SvelteToast />
<div class="sidebar">
  <div class="logo-details">
    <i class="bx bxl-c-plus-plus icon"></i>
    <div class="logo_name">VChat</div>
    <i class="bx bx-menu" id="btn"></i>
  </div>
  <ul class="nav-list">
    <li>
      <a href="/chat">
        <i class="bx bx-message-rounded"></i>
        <span class="links_name">Messages</span>
      </a>
      <span class="tooltip">Messages</span>
    </li>
    <li>
      <a href="/friends">
        <i class="bx bx-user-circle"></i>
        <span class="links_name">Friends</span>
      </a>
      <span class="tooltip">Friends</span>
    </li>
    <li>
      <a href="/groups">
        <i class="bx bx-group"></i>
        <span class="links_name">Groups</span>
      </a>
      <span class="tooltip">Groups</span>
    </li>
    <li>
      <a href="/files">
        <i class="bx bx-folder-open"></i>
        <span class="links_name">Files</span>
      </a>
      <span class="tooltip">Files</span>
    </li>
    <li>
      <a href="/analytics">
        <i class="bx bx-pie-chart-alt-2"></i>
        <span class="links_name">Analytics</span>
      </a>
      <span class="tooltip">Analytics</span>
    </li>
    <li>
      <a href="/notification">
        <i class="bx bx-bell"></i>
        <span class="links_name">Notifications</span>
      </a>
      <span class="tooltip">Notifications</span>
    </li>
    <li class="profile">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="profile-details"
        on:click={() => {
          goto(`/profile`)
        }}
      >
        <S3Image
          s3Token={$currentUser?.avatar_url}
          cssClass=" "
          defaultImage={UserImage}
        ></S3Image>
        <div class="name_job">
          <div class="name">{$currentUser?.full_name}</div>
        </div>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <i class="bx bx-log-out" on:click={showConfirmationlogOut} id="log_out"
      ></i>
    </li>
  </ul>
</div>
<section class="home-section {$pageHomeClass}">
  <slot />
</section>
<ConfirmationDialog
  bind:show={showDialog}
  message="Would you like to log out?"
  onConfirm={logOut}
/>

<style>
  .profile-details {
    cursor: pointer;
  }
</style>
