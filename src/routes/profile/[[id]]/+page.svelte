<script lang="ts">
  import { getcurrentSessionUser } from '$lib/service/login'
  import { getUserById } from '$lib/service/user'
  import { page } from '$app/stores'
  let currentUser = getcurrentSessionUser()
  let selectedUser = {}

  let userId = $page.params.id
  if (userId) {
    let user = getUserById(parseInt(userId))
    if (user) {
      selectedUser = user
    } else {
      selectedUser = currentUser
    }
  } else {
    selectedUser = currentUser
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
      <div class="card mb-4 mb-xl-0">
        <div class="card-header">Profile Picture</div>
        <div class="card-body text-center">
          <!-- Profile picture image-->
          <img
            class="img-account-profile rounded-circle mb-2"
            src="http://bootdey.com/img/Content/avatar/avatar1.png"
            alt=""
          />
          {#if currentUser.id == selectedUser.id}
            <!-- Profile picture help block-->
            <div class="small font-italic text-muted mb-4">
              JPG or PNG no larger than 5 MB
            </div>
            <!-- Profile picture upload button-->
            <button class="btn btn-primary" type="button"
              >Upload new image</button
            >
          {/if}
        </div>
      </div>
    </div>
    <div class="col-xl-4">
      <!-- Account details card-->
      <div class="card mb-4">
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
                placeholder="Phone number"
                bind:value={selectedUser.user_name}
                disabled={true}
              />
            </div>
            <!-- Save changes button-->
            {#if currentUser.id == selectedUser.id}
              <button class="btn btn-primary" type="button">Save changes</button
              >
            {/if}
          </form>
        </div>
      </div>
    </div>
    {#if currentUser.id == selectedUser.id}
      <div class="col-xl-4">
        <!-- Account details card-->
        <div class="card mb-4">
          <div class="card-header">Change password</div>
          <div class="card-body">
            <form>
              <!-- Form Group (username)-->
              <div class="mb-3">
                <label class="mb-1" for="inputUsername">New Password</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="New Password"
                />
              </div>
              <!-- Form Group (email address)-->
              <div class="mb-3">
                <label class="mb-1" for="inputEmailAddress"
                  >Repeat new password</label
                >
                <input
                  class="form-control"
                  type="text"
                  placeholder="Repeat new password"
                />
              </div>
              <!-- Save changes button-->
              {#if currentUser.id == selectedUser.id}
                <button class="btn btn-primary" type="button"
                  >Save changes</button
                >
              {/if}
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
</style>
