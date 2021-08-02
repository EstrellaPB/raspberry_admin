<template>
    <div>
        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8 text-right">
            <!-- Card stats -->
            <nuxt-link to="/user/create">
                <base-button type="primary">Create user</base-button>
            </nuxt-link>
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
                                            :data="usersData">
                                    <template slot="columns">
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Created At</th>
                                        <th>Actions</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <th scope="row">
                                            {{ row.name }}
                                        </th>
                                        <td>
                                            {{ row.surname }}
                                        </td>
                                        <td>
                                            {{ row.email }}
                                        </td>
                                        <td>
                                            {{ row.role.name }}
                                        </td>
                                        <td>
                                            {{ $moment(row.createdAt).format('LLLL') }}
                                        </td>
                                        <td class="text-center">
                                            <nuxt-link :to="`/user/${row._id}`" class="btn btn-default btn-sm">
                                                <font-awesome-icon :icon="['fas', 'edit']"/>
                                            </nuxt-link>
                                            <b-button @click="deleteUser(row._id)" variant="danger" class="btn-sm">
                                                <font-awesome-icon :icon="['fas', 'trash']"/>
                                            </b-button>
                                        </td>
                                    </template>

                                </base-table>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-end">
                            <base-pagination :total="total" :perPage="perPage" align="center" @input="changePageUsers" v-model="pagination.default"></base-pagination>
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
      await store.dispatch("users/fetchUsersPaginated", { page: 1 });
    },
    computed: {
      ...mapState({
        usersData: state => state.users.all,
        total: state => state.users.total,
        perPage: state => state.users.perPage
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
            }
        }
    },
    methods: {
        changePageUsers(e) {
            this.filters.page = e;
            this.$store.dispatch("lectures/fetchUsersPaginated", this.filters);
        },
        updateFilters(filters) {
            this.filters = {...this.filters, ...filters}
            this.$store.dispatch("lectures/fetchLecturesPaginated", this.filters);
        },
        deleteUser(id) {
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
                    this.$axios.$get(`/user/${id}/delete`).then((response) => {
                        if (response.message) {
                            this.$swal.fire(
                                'Deleted!',
                                'The user has been deleted.',
                                'success'
                            );
                            this.$store.dispatch("lectures/fetchUsersPaginated", { page: 1 });
                        }
                    });
                }
            });
        }
    }
}
</script>