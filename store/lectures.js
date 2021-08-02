import moment from 'moment'

export const state = () => ({
    all: [],
    allGraphData: [],
    total: 0,
    perPage: 10,
    filters: {
        dates: moment().format('YYYY-MM-DD')
    }
})

export const mutations = {
    FETCH_LECTURES(state, all) {
        state.all = all
    },
    FETCH_LECTURES_GRAPH_DATA(state, data) {
        state.allGraphData = data
    },
    FETCH_TOTAL(state, total) {
        state.total = total
    },
    FETCH_PER_PAGE(state, perPage) {
        state.perPage = perPage
    },
    SET_FILTERS(state, filters) {
        state.filters = filters;
    }
}

export const actions = {
    async fetchLecturesLineChart({ commit, rootState, state })  {
        await this.$axios.get(`${this.$axios.defaults.baseURL}/lecture-data`, { params: state.filters })
        .then(async (response) => {
            console.log("Lectures: ", response.data);
            let lectures = await response.data.lectures.map( (lecture) => {
                return {
                    date: new Date(lecture.createdAt),
                    power_data_1: (!!lecture.pow_sensor_data) ? lecture.pow_sensor_data.$numberDecimal : 0,
                    power_data_2: (!!lecture.pow_sensor_data_01) ? lecture.pow_sensor_data_01.$numberDecimal : 0,
                    power_data_3: (!!lecture.pow_sensor_data_02) ? lecture.pow_sensor_data_02.$numberDecimal : 0
                }
            });
            commit("FETCH_LECTURES_GRAPH_DATA", lectures);
        })
        .catch((error => {
            console.log('error: ', error)
        }))
    },
    async fetchLecturesPaginated({ commit, rootState }, { page, perPage, search, sortBy })  {
        await this.$axios.get(`${this.$axios.defaults.baseURL}/lecture`, { params: {page, perPage, search, sortBy} })
        .then((response) => {
            commit("FETCH_LECTURES", response.data.lectures);
            commit("FETCH_TOTAL", response.data.total);
            commit("FETCH_PER_PAGE", response.data.perPage);
        })
        .catch((error => {
            console.log('error: ', error)
        }))
    },
    fillFilters({ commit }, { filters }) {
        commit("SET_FILTERS", filters);
    }
}