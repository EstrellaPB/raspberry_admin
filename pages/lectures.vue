<template>
    <div>
        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->

        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-12">
                    <div class="card shadow">
                        <div class="card-header">

                        </div>
                        <div class="card-body px-0">
                            <div class="table-responsive">
                                <base-table thead-classes="thead-light"
                                            :data="lecturesData" :perPage="perPage" @update="updateFilters" :columns="columns" :sortBy="initialSort">

                                    <template slot-scope="{row}">
                                        <th scope="row">
                                            {{row.mac_address}}
                                        </th>
                                        <td class="text-center">
                                            <i class="ni ni-check-bold text-success" v-if="row.vib_sensor_data" style="font-size:1.5rem;" v-b-tooltip.hover.top title="Vibrating"></i>
                                            <i class="ni ni-fat-remove text-danger" v-if="!row.vib_sensor_data" style="font-size:1.5rem;" v-b-tooltip.hover.top title="Not vibrating"></i>
                                        </td>
                                        <td>
                                            {{ (!!row.pow_sensor_data) ? row.pow_sensor_data.$numberDecimal : 0}}
                                        </td>
                                        <td>
                                            {{ (!!row.pow_sensor_data_01) ? row.pow_sensor_data_01.$numberDecimal : 0}}
                                        </td>
                                        <td>
                                            {{ (!!row.pow_sensor_data_02) ? row.pow_sensor_data_02.$numberDecimal : 0}}
                                        </td>
                                        <td>
                                            {{ $moment(row.createdAt).format('LLLL') }}
                                        </td>
                                    </template>

                                </base-table>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-end">
                            <base-pagination :total="total" :perPage="perPage" align="center" @input="changePageLectures" v-model="pagination.default"></base-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'lectures',
    layout: 'DashboardLayout',
    async fetch ({ store, params }) {
      await store.dispatch("lectures/fetchLecturesPaginated", { page: 1 });
    },
    computed: {
      ...mapState({
        lecturesData: state => state.lectures.all,
        total: state => state.lectures.total,
        perPage: state => state.lectures.perPage
      })
    },
    data() {
        return {
            pagination: {
                default: 1
            },
            filters: {
                page: 1,
                perPage: this.perPage
            },
            columns: [
                { text: 'MAC', property: 'mac_address' },
                { text: 'Vibration Sensor', property: 'vib_sensor_data' },
                { text: 'Sensor Data 1', property: 'pow_sensor_data' },
                { text: 'Sensor Data 2', property: 'pow_sensor_data_01' },
                { text: 'Sensor Data 3', property: 'pow_sensor_data_02' },
                { text: 'Created At', property: 'createdAt' }
            ],
            initialSort: {
                column: 'createdAt',
                sort: 'descending'
            }
        }
    },
    mounted() {
        console.log(this.lecturesData);
    },
    methods: {
        changePageLectures(e) {
            this.filters.page = e;
            this.$store.dispatch("lectures/fetchLecturesPaginated", this.filters);
        },
        updateFilters(filters) {
            this.filters = {...this.filters, ...filters}
            console.log("Filters: ", this.filters);
            this.$store.dispatch("lectures/fetchLecturesPaginated", this.filters);
        }
    }
}
</script>