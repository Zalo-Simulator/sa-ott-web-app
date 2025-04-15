<script lang="ts">
  import { redirect, logInUserSession, getCurrentSessionUser } from '$lib/service/login'
  import { goto } from '$app/navigation'
  import Particles from '$lib/components/Particles.svelte'
  import { pageHomeClass, currentUser } from '$lib/service/store'
  import API from '$lib/api/Interceptor'
  import { AUTH_API } from '$lib/api/API-Endpoint'
  import { MESSAGE } from '$lib/constants/message'

  pageHomeClass.set('disable-menu')
  let isValidLogin = true

  redirect()

  const login = async () => {
    const res = await API.post(AUTH_API.login, {
      phone: phoneNumber,
      password: password
    })
    if (res) {
      isValidLogin = true
      await logInUserSession(res.data, phoneNumber)
      currentUser.set(await getCurrentSessionUser())
      goto('/chat').then(() => {
        pageHomeClass.set('')
      })
    } else {
      isValidLogin = false
    }
  }

  let phoneNumber = ''
  let password = ''

  $: validationAccount = !!phoneNumber && !!password
</script>

<svelte:head>
  <title>Login</title>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0-beta/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <link
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
    rel="stylesheet"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.bundle.min.js"
  ></script>
</svelte:head>

<div class="back-ground">
  <Particles></Particles>
</div>

<div id="login-container" class="container">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card-group mb-0">
        <div class="card p-4">
          <div class="card-body">
            <h1>VChat Login</h1>
            <p class="text-muted">Sign in to your account</p>
            <div class="input-group mb-3">
              <span class="input-group-addon"><i class="fa fa-user"></i></span>
              <input
                type="text"
                class="form-control"
                placeholder="Phone number"
                bind:value={phoneNumber}
                class:is-invalid={!isValidLogin}
              />
            </div>
            <div class="input-group mb-4" class:is-invalid={!isValidLogin}>
              <span class="input-group-addon"><i class="fa fa-lock"></i></span>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                bind:value={password}
                class:is-invalid={!isValidLogin}
              />
            </div>
            <div class="invalid-feedback">{MESSAGE.ERROR_ACCOUNT_INVALID}</div>
            <div class="row">
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-primary px-4"
                  disabled={!validationAccount}
                  on:click={login}>Login</button
                >
              </div>
              <div class="col-6 text-right">
                <a href="/reset-password" class="btn btn-link px-0"
                  >Forgot password?</a
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="box-card text-white bg-primary py-5 d-md-down-none"
          style="width:44%"
        >
          <div class="card-body text-center">
            <div>
              <h2>Sign up</h2>
              <p>
                Sign up for the VChat application to connect instantly, chat
                securely, and enjoy seamless communication with friends and
                colleagues!
              </p>
              <a href="/register" class="btn btn-primary mt-3">Register Now!</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .back-ground {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #007bff !important;
  }

  .container {
    margin-top: 50px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
    width: 100%;
    max-width: 100% !important;
  }

  @media (min-width: 576px) {
    .container {
      max-width: 540px;
    }
  }

  @media (min-width: 768px) {
    .container {
      max-width: 720px;
    }
  }

  @media (min-width: 992px) {
    .container {
      max-width: 960px;
    }
  }

  @media (min-width: 1200px) {
    .container {
      max-width: 1140px;
    }
  }

  :global(.card-columns .card) {
    margin-bottom: 0.75rem;
  }

  @media (min-width: 576px) {
    :global(.card-columns) {
      column-count: 3;
      column-gap: 1.25rem;
    }
    :global(.card-columns .card) {
      display: inline-block;
      width: 100%;
    }
  }

  button,
  a {
    cursor: pointer;
  }
  .text-muted {
    color: #9faecb !important;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .mb-3 {
    margin-bottom: 1rem !important;
  }

  .input-group {
    position: relative;
    display: flex;
    width: 100%;
  }

  .box-card {
    border: 1px solid white;
    border-left: none;
    background-color: transparent;
  }

  .invalid-feedback {
    margin-top: -20px;
    padding-bottom: 10px;
  }
</style>
