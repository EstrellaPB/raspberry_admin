<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div class="form-group mb-0">
                <!-- <base-input placeholder="Search"
                            class="input-group-alternative"
                            alternative=""
                            addon-right-icon="fas fa-search">
                </base-input> -->
            </div>
        </form>
        <client-only>
          <ul class="navbar-nav align-items-center d-none d-md-flex">
              <li class="nav-item dropdown">
                  <base-dropdown position="right" class="nav-link pr-0">
                      <div class="media align-items-center" slot="title">
                          <span class="avatar avatar-sm rounded-circle">
                            <img alt="Image placeholder" :src="`${$axios.defaults.baseURL}/user/get-image/${$auth.$state.user.image}`" />
                          </span>
                          <div class="media-body ml-2 d-none d-lg-block">
                              <span class="mb-0 text-sm  font-weight-bold">{{ $auth.$state.user.name }}</span>
                          </div>
                      </div>

                      <template>
                          <div class=" dropdown-header noti-title">
                              <h6 class="text-overflow m-0">Welcome!</h6>
                          </div>
                          <nuxt-link to="/profile" class="dropdown-item">
                              <i class="ni ni-single-02"></i>
                              <span>My profile</span>
                          </nuxt-link>
                          <div class="dropdown-divider"></div>
                          <a @click="$auth.logout()" class="dropdown-item">
                              <i class="ni ni-user-run"></i>
                              <span>Logout</span>
                          </a>
                      </template>
                  </base-dropdown>
              </li>
          </ul>
        </client-only>
    </base-nav>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },
    methods: {
      toggleSidebar() {
        this.$store.dispatch("sidebar/displaySidebar", true);
      },
      hideSidebar() {
        this.$store.dispatch("sidebar/displaySidebar", false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      }
    }
  };
</script>
