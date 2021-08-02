export const state = () => ({
    showSidebar: false,
    sidebarLinks: [],
    isMinimized: false,
    
});

export const mutations = {
  FETCH_SHOW_SIDEBAR( state, showSidebar ) {
    state.showSidebar = showSidebar;
  },
  TOGGLE_MINIMIZED( state, isMinimized ) {
    state.isMinimized = isMinimized;
  }
}

export const actions = {
  displaySidebar({ commit }, { showSidebar }) {
    commit("FETCH_SHOW_SIDEBAR", showSidebar);
  },
  toggleMinimize({ commit }, { isMinimized }) {
    document.body.classList.toggle('sidebar-mini');
    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(() => {
      window.dispatchEvent(new Event('resize'));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(() => {
      clearInterval(simulateWindowResize);
    }, 1000);

    commit('TOGGLE_MINIMIZED', isMinimized);
  }
}