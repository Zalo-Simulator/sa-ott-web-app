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
  <div class="main-container">
    <div class="row">
      <div class="col-sm-12">
        <!-- meta -->
        <div class="profile-user-box card-box bg-custom">
          <div class="row">
            <div class="col-sm-6">
              <span class="float-left mr-3"
                ><img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                  class="thumb-lg rounded-circle"
                /></span
              >
              <div class="media-body text-white">
                <h4 class="mt-1 mb-1 font-18">Michael A. Franklin</h4>
                <p class="font-13 text-light">User Experience Specialist</p>
                <p class="text-light mb-0">California, United States</p>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="text-right">
                <button type="button" class="btn btn-light waves-effect"
                  ><i class="mdi mdi-account-settings-variant mr-1"></i> Edit Profile</button
                >
              </div>
            </div>
          </div>
        </div>
        <!--/ meta -->
      </div>
    </div>
    <!-- end row -->
    <div class="row">
      <div class="col-xl-12">
        <div class="row">
          <div class="col-sm-4">
            <div class="card-box tilebox-one">
              <i class="icon-layers float-right text-muted"></i>
              <h6 class="text-muted text-uppercase mt-0">Orders</h6>
              <h2 class="" data-plugin="counterup">1,587</h2>
              <span class="badge badge-custom">+11% </span><span
                class="text-muted">From previous period</span
              >
            </div>
          </div>
          <!-- end col -->
          <div class="col-sm-4">
            <div class="card-box tilebox-one">
              <i class="icon-paypal float-right text-muted"></i>
              <h6 class="text-muted text-uppercase mt-0">Revenue</h6>
              <h2 class="">$<span data-plugin="counterup">46,782</span></h2>
              <span class="badge badge-danger">-29% </span><span
                class="text-muted">From previous period</span
              >
            </div>
          </div>
          <!-- end col -->
          <div class="col-sm-4">
            <div class="card-box tilebox-one">
              <i class="icon-rocket float-right text-muted"></i>
              <h6 class="text-muted text-uppercase mt-0">Product Sold</h6>
              <h2 class="" data-plugin="counterup">1,890</h2>
              <span class="badge badge-custom">+89% </span><span
                class="text-muted">Last year</span
              >
            </div>
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
        <div class="card-box">
          <h4 class="header-title mt-0 mb-3">Experience</h4>
          <div class="">
            <div class="">
              <h5 class="text-custom">Lead designer / Developer</h5>
              <p class="mb-0">websitename.com</p>
              <p><b>2010-2015</b></p>
              <p class="text-muted font-13 mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <hr />
            <div class="">
              <h5 class="text-custom">Senior Graphic Designer</h5>
              <p class="mb-0">coderthemes.com</p>
              <p><b>2007-2009</b></p>
              <p class="text-muted font-13 mb-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
        <div class="card-box">
          <h4 class="header-title mb-3">My Projects</h4>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project Name</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Assign</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Adminox Admin</td>
                  <td>01/01/2015</td>
                  <td>07/05/2015</td>
                  <td><span class="label label-info">Work in Progress</span></td
                  >
                  <td>Coderthemes</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Adminox Frontend</td>
                  <td>01/01/2015</td>
                  <td>07/05/2015</td>
                  <td><span class="label label-success">Pending</span></td>
                  <td>Coderthemes</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Adminox Admin</td>
                  <td>01/01/2015</td>
                  <td>07/05/2015</td>
                  <td><span class="label label-pink">Done</span></td>
                  <td>Coderthemes</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Adminox Frontend</td>
                  <td>01/01/2015</td>
                  <td>07/05/2015</td>
                  <td
                    ><span class="label label-purple">Work in Progress</span
                    ></td
                  >
                  <td>Coderthemes</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Adminox Admin</td>
                  <td>01/01/2015</td>
                  <td>07/05/2015</td>
                  <td><span class="label label-warning">Coming soon</span></td>
                  <td>Coderthemes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </div>
  <!-- container -->
</div>

<style>

  .thumb-lg {
    height: 88px;
    width: 88px;
  }
  .profile-user-box {
    position: relative;
    border-radius: 5px;
  }
  .bg-custom {
    background-color: #02c0ce !important;
  }
  .profile-user-box {
    position: relative;
    border-radius: 5px;
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

  :global(.comment-list .comment-box-item) {
    position: relative;
  }

  :global(.comment-list .comment-box-item .commnet-item-date) {
    color: #98a6ad;
    font-size: 11px;
    position: absolute;
    right: 7px;
    top: 2px;
  }

  :global(.comment-list .comment-box-item .commnet-item-msg) {
    color: #313a46;
    display: block;
    margin: 10px 0;
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
  }

  :global(.comment-list .comment-box-item .commnet-item-user) {
    color: #98a6ad;
    display: block;
    font-size: 14px;
    margin: 0;
  }

  :global(.comment-list a + a) {
    margin-top: 15px;
    display: block;
  }

  .ribbon-box .ribbon-primary {
    background: #2d7bf4;
  }

  .ribbon-box .ribbon {
    position: relative;
    float: left;
    clear: both;
    padding: 5px 12px 5px 12px;
    margin-left: -30px;
    margin-bottom: 15px;
    font-family: Rubik, sans-serif;
    -webkit-box-shadow: 2px 5px 10px rgba(49, 58, 70, 0.15);
    -o-box-shadow: 2px 5px 10px rgba(49, 58, 70, 0.15);
    box-shadow: 2px 5px 10px rgba(49, 58, 70, 0.15);
    color: #fff;
    font-size: 13px;
  }
  .text-custom {
    color: #02c0ce !important;
  }

  .badge-custom {
    background: #02c0ce;
    color: #fff;
  }
  .badge {
    font-family: Rubik, sans-serif;
    -webkit-box-shadow:
      0 0 24px 0 rgba(0, 0, 0, 0.06),
      0 1px 0 0 rgba(0, 0, 0, 0.02);
    box-shadow:
      0 0 24px 0 rgba(0, 0, 0, 0.06),
      0 1px 0 0 rgba(0, 0, 0, 0.02);
    padding: 0.35em 0.5em;
    font-weight: 500;
  }
  .text-muted {
    color: #98a6ad !important;
  }

  .font-13 {
    font-size: 13px !important;
  }
</style>
