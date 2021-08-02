export const state = () => ({
    all: [],
    total: 0,
    perPage: 10,
    filters: {}
});

export const mutations = {
    FETCH_USERS(state, all) {
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
    async fetchUsersPaginated({ commit, rootState }, { page, perPage, search })  {
        await this.$axios.get(`${this.$axios.defaults.baseURL}/user`, { params: { page, perPage, search } })
            .then((response) => {
                commit("FETCH_USERS", response.data.users);
                commit("FETCH_TOTAL", response.data.total);
                commit("FETCH_PER_PAGE", response.data.perPage);
            })
            .catch((error => {
                console.log('error: ', error)
            }))
    }
}