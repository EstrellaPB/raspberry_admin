<template>
  <div class="wrapper" :class="{ 'nav-open': $store.state.sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Raspberry Manager"
      title="Raspberry Manager"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/'
          }"
        />

        <sidebar-item :link="{name: 'Lectures', icon: 'ni ni-bullet-list-67', path: '/lectures'}"/>
        <sidebar-item :link="{name: 'Users', icon: 'ni ni-circle-08', path: '/users'}"/>
        <sidebar-item :link="{name: 'Devices', icon: 'ni ni-mobile-button', path: '/device'}"/>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <client-only>
        <dashboard-navbar></dashboard-navbar>
      </client-only>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';
  import SideBar from '~/components/SidebarPlugin/SideBar.vue';
  import SidebarItem from '~/components/SidebarPlugin/SidebarItem.vue';
  import '@fortawesome/fontawesome';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition,
      SideBar,
      SidebarItem
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        let showSidebar = this.$store.state.sidebar.showSidebar
        if (showSidebar) {
          this.$store.dispatch('sidebar/displaySidebar', { showSidebar:  !showSidebar});
        }
      },
      validateUserPermissionFor(permission) {
        let found = this.$auth.$state.user.role.permissions.find(function(element){
          return element.name == permission
        })

        return found != null
      }
    }
  };
</script>
<style lang="scss">
</style>
