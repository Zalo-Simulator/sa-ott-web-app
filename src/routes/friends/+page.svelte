<script lang="ts">
  import Tab from '$lib/components/Tab.svelte'
  let tabIndex = 0
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

<div class="content">
  <Tab bind:tabIndex tabs={['Total Friends: 100', 'Make a New Friend']}></Tab>
  <div class="main-container">
    {#if tabIndex == 0}
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-6">
          <!-- Personal-Information -->
          <div class="card-box ribbon-box">
            <div class="clearfix"></div>
            <div class="inbox-widget">
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Tomaslau</p>
                  <p class="inbox-item-text">I've finished it! See you so...</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Stillnotdavid</p>
                  <p class="inbox-item-text">This theme is awesome!</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar4.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Kurafire</p>
                  <p class="inbox-item-text">Nice to meet you</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar5.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Shahedk</p>
                  <p class="inbox-item-text">Hey! there I'm available...</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Adhamdannaway</p>
                  <p class="inbox-item-text">This theme is awesome!</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Tomaslau</p>
                  <p class="inbox-item-text">I've finished it! See you so...</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Stillnotdavid</p>
                  <p class="inbox-item-text">This theme is awesome!</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Tomaslau</p>
                  <p class="inbox-item-text">I've finished it! See you so...</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Stillnotdavid</p>
                  <p class="inbox-item-text">This theme is awesome!</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar4.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Kurafire</p>
                  <p class="inbox-item-text">Nice to meet you</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar5.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Shahedk</p>
                  <p class="inbox-item-text">Hey! there I'm available...</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Adhamdannaway</p>
                  <p class="inbox-item-text">This theme is awesome!</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Tomaslau</p>
                  <p class="inbox-item-text">I've finished it! See you so...</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Stillnotdavid</p>
                  <p class="inbox-item-text">This theme is awesome!</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Reply</button
                    >
                  </p>
                </div>
              </a>
            </div>
          </div>
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
            />
          </div>
        </div>
      </div>
      <div class="row" style="margin-left: 10px;">
          Suggestions: 
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-6">
          <!-- Personal-Information -->
          <div class="card-box ribbon-box">
            <div class="clearfix"></div>
            <div class="inbox-widget">
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Tomaslau</p>
                  <p class="inbox-item-text">I've finished it! See you so...</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Stillnotdavid</p>
                  <p class="inbox-item-text">This theme is awesome!</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar4.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Kurafire</p>
                  <p class="inbox-item-text">Nice to meet you</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar5.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Shahedk</p>
                  <p class="inbox-item-text">Hey! there I'm available...</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Adhamdannaway</p>
                  <p class="inbox-item-text">This theme is awesome!</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Tomaslau</p>
                  <p class="inbox-item-text">I've finished it! See you so...</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Stillnotdavid</p>
                  <p class="inbox-item-text">This theme is awesome!</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Tomaslau</p>
                  <p class="inbox-item-text">I've finished it! See you so...</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Stillnotdavid</p>
                  <p class="inbox-item-text">This theme is awesome!</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar4.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Kurafire</p>
                  <p class="inbox-item-text">Nice to meet you</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar5.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Shahedk</p>
                  <p class="inbox-item-text">Hey! there I'm available...</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Adhamdannaway</p>
                  <p class="inbox-item-text">This theme is awesome!</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Tomaslau</p>
                  <p class="inbox-item-text">I've finished it! See you so...</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
              <a href="#">
                <div class="inbox-item">
                  <div class="inbox-item-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      class="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p class="inbox-item-author">Stillnotdavid</p>
                  <p class="inbox-item-text">This theme is awesome!</p>
                  <p class="inbox-item-date">
                    <button
                      type="button"
                      class="btn btn-icon btn-sm waves-effect waves-light btn-primary"
                      >Make friend</button
                    >
                  </p>
                </div>
              </a>
            </div>
          </div>
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

  .content::after {
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
