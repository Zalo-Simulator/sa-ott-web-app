<script lang="ts">
  import { getCurrentSessionUser } from '$lib/service/login'
  import { getUserbyId } from '$lib/service/user'
  import { page } from '$app/stores'
  import { isValidPassword } from '$lib/utils/validation'
  import { MESSAGE } from '$lib/constants/message'
  import API from '$lib/api/Interceptor'
  import { AUTH_API, USER_API, MEDIA_API } from '$lib/api/API-Endpoint'
  import { onMount } from 'svelte'
  import UserImage from '../../../imgs/User Frame Black.png'
  import { getUserSession } from '$lib/service/login'

  let currentUser = getCurrentSessionUser()
  let selectedUser = {
    id: '0',
    full_name: '',
    phone: '',
    avatar_url: ''
  }
  let oldPassword = ''
  let newPassword = ''
  let repeatPassword = ''
  let fileInput: any
  let userId = $page.params.id

  onMount(async () => {
    getUser()
  })

  const getUser = async () => {
    if (userId && userId != currentUser.id) {
      let user = await getUserbyId(userId)
      if (user.data) {
        selectedUser = user.data
      } else {
        selectedUser = currentUser
      }
    } else {
      selectedUser = currentUser
    }
  }

  $: passwordValid = isValidPassword(newPassword)
  $: validationPassword =
    !!oldPassword &&
    !!newPassword &&
    passwordValid &&
    newPassword == repeatPassword

  const changePassword = async () => {
    let res = await API.put(
      AUTH_API.changePassword,
      {
        current_password: oldPassword,
        new_password: newPassword
      },
      MESSAGE.SUCCESS_CHANGE_PASSWORD
    )

    oldPassword = ''
    newPassword = ''
    repeatPassword = ''
    return res
  }

  const updateUser = async () => {
    let res = await API.put(
      USER_API.updateUser.replaceAll('{id}', selectedUser.id),
      {
        full_name: selectedUser.full_name,
        avatar_url: selectedUser.avatar_url || '',
        is_active: true
      },
      MESSAGE.SUCCESS_CHANGE_ACCOUNT
    )
    return res
  }

  const uploadProfileImage = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = target.files

    if (!files || files.length === 0) {
      alert('No file selected')
      return
    }

    const file = files[0]
    const formData = new FormData()
    formData.append('user_id', selectedUser.id)
    formData.append('file', file)

    try {
      const session: any = getUserSession()
      let token = ''
      if (session) {
        token = JSON.parse(session).access_token
      }

      const response = await fetch(MEDIA_API.upload, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Upload successful:', result)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }
</script>

<svelte:head>
  <title>Profile Dashboard</title>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.bundle.min.js"
  ></script>
</svelte:head>

<div id="profile-container" class="container-xl px-4 mt-4">
  <div class="row">
    <div class="col-xl-4">
      <!-- Profile picture card-->
      <div class="card mb-4 mb-xl-0 full-box">
        <div class="card-header">Profile Picture</div>
        <div class="card-body text-center">
          <!-- Profile picture image-->
          <img
            class="img-account-profile rounded-circle mb-2"
            src={selectedUser?.avatar_url || UserImage}
            alt=""
          />
          {#if currentUser.id == selectedUser.id}
            <!-- Profile picture help block-->
            <div class="small font-italic text-muted mb-4">
              JPG or PNG no larger than 5 MB
            </div>
            <!-- Profile picture upload button-->
            <button
              class="btn btn-primary"
              type="button"
              on:click={() => fileInput.click()}>Upload new image</button
            >
            <input
              type="file"
              bind:this={fileInput}
              on:change={uploadProfileImage}
              style="display: none;"
            />
          {/if}
        </div>
      </div>
    </div>
    <div class="col-xl-4">
      <!-- Account details card-->
      <div class="card mb-4 full-box">
        <div class="card-header">Account Details</div>
        <div class="card-body">
          <form>
            <!-- Form Group (username)-->
            <div class="mb-3">
              <label class="mb-1" for="inputUsername">Display Name</label>
              <input
                class="form-control"
                type="text"
                placeholder="Your full name"
                bind:value={selectedUser.full_name}
                disabled={currentUser.id != selectedUser.id}
              />
            </div>
            <!-- Form Group (email address)-->
            <div class="mb-3">
              <label class="mb-1" for="inputEmailAddress">Phone Number</label>
              <input
                class="form-control"
                type="text"
                placeholder="Private information"
                bind:value={selectedUser.phone}
                disabled={true}
              />
            </div>
            <!-- Save changes button-->
            {#if currentUser.id == selectedUser.id}
              <button
                class="btn btn-primary"
                type="button"
                disabled={!selectedUser.full_name}
                on:click={updateUser}>Save changes</button
              >
            {/if}
          </form>
        </div>
      </div>
    </div>
    {#if currentUser.id == selectedUser.id}
      <div class="col-xl-4">
        <!-- Account details card-->
        <div class="card mb-4 full-box">
          <div class="card-header">Change password</div>
          <div class="card-body">
            <form>
              <!-- Form Group (username)-->
              <div class="mb-3">
                <label class="mb-1" for="inputUsername">Old Password</label>
                <input
                  class="form-control"
                  type="password"
                  placeholder="Old Password"
                  bind:value={oldPassword}
                />
              </div>
              <div class="mb-3">
                <label class="mb-1" for="inputUsername">New Password</label>
                <input
                  class="form-control"
                  type="password"
                  placeholder="New Password"
                  bind:value={newPassword}
                  class:is-invalid={!!newPassword && !passwordValid}
                />
                <div class="invalid-feedback">
                  {MESSAGE.ERROR_PASSWORD_INVALID}
                </div>
              </div>
              <!-- Form Group (email address)-->
              <div class="mb-3">
                <label class="mb-1" for="inputEmailAddress"
                  >Repeat new password</label
                >
                <input
                  class="form-control"
                  type="password"
                  placeholder="Repeat new password"
                  bind:value={repeatPassword}
                  class:is-invalid={!!repeatPassword &&
                    repeatPassword != newPassword}
                />
                <div class="invalid-feedback">
                  {MESSAGE.ERROR_PASSWORD_NOT_SAME}
                </div>
              </div>
              <button
                class="btn btn-primary"
                type="button"
                disabled={!validationPassword}
                on:click={changePassword}>Save changes</button
              >
            </form>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .img-account-profile {
    height: 10rem;
  }
  .rounded-circle {
    border-radius: 50% !important;
  }
  .card {
    box-shadow: 0 0.15rem 0.15rem 0 rgb(33 40 50 / 15%);
  }
  .card .card-header {
    font-weight: 500;
  }
  .card-header:first-child {
    border-radius: 0.35rem 0.35rem 0 0;
  }
  .card-header {
    padding: 1rem 1.35rem;
    margin-bottom: 0;
    background-color: rgba(33, 40, 50, 0.03);
    border-bottom: 1px solid rgba(33, 40, 50, 0.125);
  }
  .form-control {
    display: block;
    width: 100%;
    padding: 0.875rem 1.125rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1;
    color: #69707a;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #c5ccd6;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.35rem;
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
  }

  .full-box {
    height: 95%;
  }
</style>
