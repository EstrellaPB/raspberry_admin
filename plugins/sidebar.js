import Sidebar from '@/components/SidebarPlugin/SideBar.vue';
import SidebarItem from '@/components/SidebarPlugin/SidebarItem.vue';

const SidebarPlugin = {
  install(Vue, options) {
    if (options && options.sidebarLinks) {
      this.$store.sidebar.sidebarLinks = options.sidebarLinks;
    }
    let app = new Vue({
      data: {
        sidebarStore: SidebarStore
      }
    });
    Vue.prototype.$sidebar = this.$store.sidebar;
    Vue.component('side-bar', Sidebar);
    Vue.component('sidebar-item', SidebarItem);
  }
};

export default SidebarPlugin;