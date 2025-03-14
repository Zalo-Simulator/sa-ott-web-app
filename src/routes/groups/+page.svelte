<script lang="ts">
  import Tab from '$lib/components/Tab.svelte'
  import ListUsers from '$lib/components/ListUsers.svelte';
  let tabIndex = 0

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

  let colors = []
  for (let i = 0; i < 23; i++) {
    colors.push(getRandomColor())
  }
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
  <Tab bind:tabIndex tabs={['Total Groups: 12', 'Make a New Group']}></Tab>
  {#if tabIndex == 0}
    <div class="row groups">
      <div class="col-xl-2 col-lg-3 col-sm-4 col-6">
        <div class="groups__item">
          <a href="">
            <div class="groups__img">
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar4.png"
                alt=""
              />
            </div>

            <div class="groups__info">
              <strong>Sold Properties</strong>
              <small>106 Contacts</small>
            </div>
          </a>

          <div class="actions">
            <div class="dropdown actions__item">
              <i class="zmdi zmdi-more-vert" data-toggle="dropdown"></i>

              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="">Edit</a>
                <a
                  class="dropdown-item"
                  href=""
                  data-demo-action="delete-listing">Delete</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-2 col-lg-3 col-sm-4 col-6">
        <div class="groups__item">
          <a href="">
            <div class="groups__img">
              <div
                class="avatar-img avatar-char"
                style="background: {colors[0]}"
              >
                A
              </div>
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                alt=""
              />
              <div
                class="avatar-img avatar-char"
                style="background: {colors[1]}"
              >
                D
              </div>
            </div>

            <div class="groups__info">
              <strong>San Fransisco</strong>
              <small>12 Contacts</small>
            </div>
          </a>

          <div class="actions">
            <div class="dropdown actions__item">
              <i class="zmdi zmdi-more-vert" data-toggle="dropdown"></i>

              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="">Edit</a>
                <a
                  class="dropdown-item"
                  href=""
                  data-demo-action="delete-listing">Delete</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-2 col-lg-3 col-sm-4 col-6">
        <div class="groups__item">
          <a href="">
            <div class="groups__img">
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt=""
              />
              <div
                class="avatar-img avatar-char"
                style="background: {colors[3]}"
              >
                E
              </div>
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
            </div>

            <div class="groups__info">
              <strong>Pending Leads</strong>
              <small>42 Contacts</small>
            </div>
          </a>
          <div class="actions">
            <div class="dropdown actions__item">
              <i class="zmdi zmdi-more-vert" data-toggle="dropdown"></i>

              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="">Edit</a>
                <a
                  class="dropdown-item"
                  href=""
                  data-demo-action="delete-listing">Delete</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-2 col-lg-3 col-sm-4 col-6">
        <div class="groups__item">
          <a href="">
            <div class="groups__img">
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar4.png"
                alt=""
              />
              <div
                class="avatar-img avatar-char"
                style="background: {colors[4]}"
              >
                T
              </div>
            </div>

            <div class="groups__info">
              <strong>Management</strong>
              <small>3 Contacts</small>
            </div>
          </a>
          <div class="actions">
            <div class="dropdown actions__item">
              <i class="zmdi zmdi-more-vert" data-toggle="dropdown"></i>

              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="">Edit</a>
                <a
                  class="dropdown-item"
                  href=""
                  data-demo-action="delete-listing">Delete</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-2 col-lg-3 col-sm-4 col-6">
        <div class="groups__item">
          <a href="">
            <div class="groups__img">
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar4.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                alt=""
              />
            </div>

            <div class="groups__info">
              <strong>Colleagues</strong>
              <small>22 Contacts</small>
            </div>
          </a>
          <div class="actions">
            <div class="dropdown actions__item">
              <i class="zmdi zmdi-more-vert" data-toggle="dropdown"></i>

              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="">Edit</a>
                <a
                  class="dropdown-item"
                  href=""
                  data-demo-action="delete-listing">Delete</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-2 col-lg-3 col-sm-4 col-6">
        <div class="groups__item">
          <a href="">
            <div class="groups__img">
              <div
                class="avatar-img avatar-char"
                style="background: {colors[5]}"
              >
                E
              </div>
              <div
                class="avatar-img avatar-char"
                style="background: {colors[6]}"
              >
                T
              </div>
              <div
                class="avatar-img avatar-char"
                style="background: {colors[7]}"
              >
                O
              </div>
              <div
                class="avatar-img avatar-char"
                style="background: {colors[8]}"
              >
                G
              </div>
            </div>

            <div class="groups__info">
              <strong>Los Angeles</strong>
              <small>27 Contacts</small>
            </div>
          </a>
          <div class="actions">
            <div class="dropdown actions__item">
              <i class="zmdi zmdi-more-vert" data-toggle="dropdown"></i>

              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="">Edit</a>
                <a
                  class="dropdown-item"
                  href=""
                  data-demo-action="delete-listing">Delete</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-2 col-lg-3 col-sm-4 col-6">
        <div class="groups__item">
          <a href="">
            <div class="groups__img">
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
              <div
                class="avatar-img avatar-char"
                style="background: {colors[9]}"
              >
                A
              </div>
              <div
                class="avatar-img avatar-char"
                style="background: {colors[10]}"
              >
                S
              </div>
              <div
                class="avatar-img avatar-char"
                style="background: {colors[11]}"
              >
                X
              </div>
            </div>

            <div class="groups__info">
              <strong>Out Sourcing</strong>
              <small>1 Contacts</small>
            </div>
          </a>
          <div class="actions">
            <div class="dropdown actions__item">
              <i class="zmdi zmdi-more-vert" data-toggle="dropdown"></i>

              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="">Edit</a>
                <a
                  class="dropdown-item"
                  href=""
                  data-demo-action="delete-listing">Delete</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-2 col-lg-3 col-sm-4 col-6">
        <div class="groups__item">
          <a href="">
            <div class="groups__img">
              <div
                class="avatar-img avatar-char"
                style="background: {colors[12]}"
              >
                Z
              </div>
              <div
                class="avatar-img avatar-char"
                style="background: {colors[13]}"
              >
                R
              </div>
              <div
                class="avatar-img avatar-char"
                style="background: {colors[14]}"
              >
                N
              </div>
              <div
                class="avatar-img avatar-char"
                style="background: {colors[15]}"
              >
                B
              </div>
            </div>

            <div class="groups__info">
              <strong>San Diego</strong>
              <small>243 Contacts</small>
            </div>
          </a>
          <div class="actions">
            <div class="dropdown actions__item">
              <i class="zmdi zmdi-more-vert" data-toggle="dropdown"></i>

              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="">Edit</a>
                <a
                  class="dropdown-item"
                  href=""
                  data-demo-action="delete-listing">Delete</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-2 col-lg-3 col-sm-4 col-6">
        <div class="groups__item">
          <a href="">
            <div class="groups__img">
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar5.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                alt=""
              />
            </div>

            <div class="groups__info">
              <strong>Communication</strong>
              <small>96 Contacts</small>
            </div>
          </a>
          <div class="actions">
            <div class="dropdown actions__item">
              <i class="zmdi zmdi-more-vert" data-toggle="dropdown"></i>

              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="">Edit</a>
                <a
                  class="dropdown-item"
                  href=""
                  data-demo-action="delete-listing">Delete</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-2 col-lg-3 col-sm-4 col-6">
        <div class="groups__item">
          <a href="">
            <div class="groups__img">
              <div
                class="avatar-img avatar-char"
                style="background: {colors[16]}"
              >
                D
              </div>
              <div
                class="avatar-img avatar-char"
                style="background: {colors[17]}"
              >
                L
              </div>
              <div
                class="avatar-img avatar-char"
                style="background: {colors[18]}"
              >
                S
              </div>
              <div
                class="avatar-img avatar-char"
                style="background: {colors[19]}"
              >
                A
              </div>
            </div>

            <div class="groups__info">
              <strong>Not varified</strong>
              <small>0 Contacts</small>
            </div>
          </a>
          <div class="actions">
            <div class="dropdown actions__item">
              <i class="zmdi zmdi-more-vert" data-toggle="dropdown"></i>

              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="">Edit</a>
                <a
                  class="dropdown-item"
                  href=""
                  data-demo-action="delete-listing">Delete</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-2 col-lg-3 col-sm-4 col-6">
        <div class="groups__item">
          <a href="">
            <div class="groups__img">
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt=""
              />
              <div
                class="avatar-img avatar-char"
                style="background: {colors[20]}"
              >
                G
              </div>
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt=""
              />
            </div>

            <div class="groups__info">
              <strong>Email List</strong>
              <small>10 Contacts</small>
            </div>
          </a>
          <div class="actions">
            <div class="dropdown actions__item">
              <i class="zmdi zmdi-more-vert" data-toggle="dropdown"></i>

              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="">Edit</a>
                <a
                  class="dropdown-item"
                  href=""
                  data-demo-action="delete-listing">Delete</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-2 col-lg-3 col-sm-4 col-6">
        <div class="groups__item">
          <a href="">
            <div class="groups__img">
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
              <div
                class="avatar-img avatar-char"
                style="background: {colors[21]}"
              >
                G
              </div>
              <div
                class="avatar-img avatar-char"
                style="background: {colors[22]}"
              >
                L
              </div>
              <img
                class="avatar-img"
                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                alt=""
              />
            </div>

            <div class="groups__info">
              <strong>Connected</strong>
              <small>178 Contacts</small>
            </div>
          </a>
          <div class="actions">
            <div class="dropdown actions__item">
              <i class="zmdi zmdi-more-vert" data-toggle="dropdown"></i>

              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="">Edit</a>
                <a
                  class="dropdown-item"
                  href=""
                  data-demo-action="delete-listing">Delete</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
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
          />
        </div>
      </div>
    </div>
    <div class="row" style="margin-left: 10px;">Suggestions:</div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-6">
        <ListUsers buttonText="Add"></ListUsers>
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

  .groups__item:hover .actions {
    opacity: 1;
  }

  .groups__item .actions {
    position: absolute;
    top: 0.7rem;
    right: 0.5rem;
    z-index: 1;
    opacity: 0;
  }

  .groups__img {
    width: 6.5rem;
    display: inline-block;
  }

  .groups__img .avatar-img {
    display: inline-block;
    margin: 0 1px 4px 0;
    vertical-align: top;
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
</style>
