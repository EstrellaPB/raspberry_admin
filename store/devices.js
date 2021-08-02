export const state = () => ({
    all: [],
    total: 0,
    perPage: 10,
    filters: {}
})

export const mutations = {
    FETCH_DEVICES(state, all) {
        state.all = all
    },
    FETCH_TOTAL(state, total) {
        state.total = total
    },
    FETCH_PER_PAGE(state, perPage) {
        state.perPage = perPage
    }
}

export const actions = {
    async fetchDevicesPaginated({ commit, rootState }, {page})  {
        var p = 1;
        if (page) {
            p = page;
        }
        var pageObj = { page: p };
        await this.$axios.get(`${this.$axios.defaults.baseURL}/device/paginated`, { params: { ...state.filters, ...pageObj } })
            .then((response) => {
                commit("FETCH_DEVICES", response.data.devices);
                commit("FETCH_TOTAL", response.data.total);
                commit("FETCH_PER_PAGE", response.data.perPage);
            })
            .catch((error => {
                console.log('error: ', error);
            }))
    }
}