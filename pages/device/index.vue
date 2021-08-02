<template>
    <div>
        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8 text-right">
            <!-- Card stats -->
            <nuxt-link to="/device/create">
                <base-button type="primary">Create device</base-button>
            </nuxt-link>
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-12">
                    <div class="card shadow">
                        <div class="card-header">

                        </div>
                        <div class="table-responsive">
                            <base-table thead-classes="thead-light"
                                        :data="devicesData">
                                <template slot="columns">
                                    <th>MAC</th>
                                    <th>IP</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </template>

                                <template slot-scope="{row}" v-if="!!devicesData && devicesData.length > 0">
                                    <td scope="row">
                                        {{row.mac_address}}
                                    </td>
                                    <td class="text-center">
                                        {{row.ip}}
                                    </td>
                                    <td>
                                        {{ $moment(row.createdAt).format('LLLL') }}
                                    </td>
                                    <td class="text-center">
                                        <nuxt-link :to="`/device/${row._id}`" class="btn btn-default btn-sm">
                                            <font-awesome-icon :icon="['fas', 'edit']"/>
                                        </nuxt-link>
                                        <b-button @click="deleteDevice(row._id)" variant="danger" class="btn-sm">
                                            <font-awesome-icon :icon="['fas', 'trash']"/>
                                        </b-button>
                                    </td>
                                </template>

                            </base-table>
                        </div>
                        <div class="card-footer d-flex justify-content-end">
                            <base-pagination :total="total" :perPage="perPage" align="center" @input="changePageDevices" v-model="pagination.default"></base-pagination>
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
    name: 'devices',
    layout: 'DashboardLayout',
    async fetch ({ store, params }) {
      await store.dispatch("devices/fetchDevicesPaginated", { page: 1 });
    },
    computed: {
      ...mapState({
        devicesData: state => state.devices.all,
        total: state => state.devices.total,
        perPage: state => state.devices.perPage
      })
    },
    data() {
        return {
            pagination: {
                default: 1
            }
        }
    },
    methods: {
        changePageDevices(e) {
            this.$store.dispatch("devices/fetchDevicesPaginated", { page: e });
        },
        deleteDevice(id) {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#608875',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.isBusy = true;
                    this.$axios.$get(`/device/${id}/delete`).then((response) => {
                        if (response.message) {
                            this.$swal.fire(
                                'Deleted!',
                                'Your device has been deleted.',
                                'success'
                            );
                            this.$store.dispatch("devices/fetchDevicesPaginated", { page: 1 });
                        }
                    });
                }
            });
        }
    }
}
</script>