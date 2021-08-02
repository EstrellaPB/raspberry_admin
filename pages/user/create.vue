<template>
    <div>
        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8 text-right">
            <!-- Card stats -->

        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="row justify-content-center mb-5">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img :src="`${$axios.defaults.baseURL}/user/get-image/${user.image}`" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            <div class="d-flex justify-content-between">
                                <!-- <base-button size="sm" type="info" class="mr-4">Connect</base-button>
                                <base-button size="sm" type="default" class="float-right">Message</base-button> -->
                            </div>
                        </div>
                        <div class="card-body pt-5">
                            <div class="justify-content-center">
                                <!-- <uploader v-model="user.image" :apiUrl="`${$axios.defaults.baseURL}/user/${user._id}/upload-image`" @presigned="fetchUser($event.user)" :sendOnInput="false"></uploader> -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">My account</h3>
                                </div>
                            </div>
                        </div>
                        <base-alert type="danger" v-if="errors">
                            <span class="alert-inner--icon"><i class="ni ni-notification-70"></i></span>
                            <span class="alert-inner--text">
                                <strong>Validation failed!</strong>
                                <ul>
                                    <li v-for="(error, index) in errors" :key="index">{{ error.msg }}</li>
                                </ul>
                            </span>

                        </base-alert>
                        <template>
                            <form @submit.prevent="saveUser">
                                <h6 class="heading-small text-muted mb-4">User information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Name"
                                                        placeholder="Name"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.name"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Email address"
                                                        placeholder="jesse@example.com"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.email"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Username"
                                                        placeholder="Username"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.surname"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-dropdown-select
                                                label="Role"
                                                :options="roles"
                                                placeholder="Select role"
                                                v-model="user.role">
                                            </base-dropdown-select>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div class="pl-lg-4">
                                    <div class="row justify-content-center">
                                        <div class="col-lg-12 text-center">
                                            <base-input alternative=""
                                                        label="Password"
                                                        placeholder="User password"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.password"
                                            />
                                        </div>
                                        <div class="col-lg-12 text-center">
                                            <base-input alternative=""
                                                        label="Confirm Password"
                                                        placeholder="User password confirmation"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.confirmPassword"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="pl-lg-4">
                                    <div class="row justify-content-center">
                                        <div class="col-lg-6 text-center">
                                            <button class="btn btn-success" type="submit">Save user</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Uploader from '~/components/Uploader.vue';

export default {
    layout: 'DashboardLayout',
    components: {
        Uploader
    },
    async asyncData({$axios, params}) {
        var { roles } = await $axios.$get('/role');
        roles = await roles.map(role => {
            return { name: role.name, value: role._id }
        });

        var user = {
            name: null,
            email: null,
            surname: null,
            role: null,
            password: null,
            confirmPassword: null
        }

        return { roles: roles, user: user };
    },
    data() {
      return {
        errors: null,
        successMsg: null
      }
    },
    methods: {
        saveUser() {
            this.$axios.$post(`/register`, this.user).then((response) => {
                console.log(response);
                if (response.user) {
                    this.errors = null;
                    this.successMsg = 'User created!';
                    this.$auth.fetchUser();
                    this.$swal({
                        type: 'success',
                        text: this.successMsg
                    });
                } else {
                    this.$swal({
                        type: 'success',
                        text: response
                    });
                }
            })
            .catch(err => {
                console.log(err.response.data);
                this.errors = err.response.data.errors;
            })
        },
        async fetchUser(user) {
            var { user } = await this.$axios.$get(`/user/${user._id}`);
            this.user = user;
        }
    },
    watch: {
      image: function (newVal, oldVal) {
        console.log(newVal);
      }
    }
};
</script>