<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 600px; background-image: url(img/theme/raspberry-cover.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-danger opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Hello {{ $auth.$state.user.name }}</h1>
                        <p class="text-white mt-0 mb-5">This is your profile page.</p>
                        <a href="#!" class="btn btn-success" @click="saveProfile">Edit profile</a>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="row justify-content-center mb-5">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img :src="`${$axios.defaults.baseURL}/user/get-image/${$auth.$state.user.image}`" class="rounded-circle">
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
                        <base-alert type="danger"  v-if="errors">
                            <span class="alert-inner--icon"><i class="ni ni-notification-70"></i></span>
                            <span class="alert-inner--text">
                                <strong>Validation failed!</strong>
                                <ul>
                                    <li v-for="(error, index) in errors" :key="index">{{ error.msg }}</li>
                                </ul>
                            </span>
                            
                        </base-alert>
                        <template>
                            <form @submit.prevent>
                                <h6 class="heading-small text-muted mb-4">User information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Name"
                                                        placeholder="Name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.name"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Email address"
                                                        placeholder="jesse@example.com"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.email"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Username"
                                                        placeholder="Username"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.surname"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-dropdown-select
                                                label="Role"
                                                :options="roles" 
                                                placeholder="Select role"
                                                v-model="model.role">
                                            </base-dropdown-select>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'user-profile',
    layout: 'DashboardLayout',
    async asyncData({$axios}) {
        let { roles } = await $axios.$get('/role');
        roles = await roles.map(role => { 
            return { name: role.name, value: role._id }
        });
        return { roles };
    },
    data() {
      return {
        model: {
          name: this.$auth.$state.user.name,
          email: this.$auth.$state.user.email,
          surname: this.$auth.$state.user.surname,
          role: this.$auth.$state.user.role
        },
        errors: null,
        successMsg: null
      }
    },
    mounted() {
        console.log(this.$auth.$state.user);
    },
    methods: {
        saveProfile() {
            var id = this.$auth.$state.user.sub ? this.$auth.$state.user.sub : this.$auth.$state.user._id;
            this.$axios.$post(`/user/${id}/update`, this.model).then((response) => {
                console.log(response);
                if (response.user) {
                    this.errors = null;
                    this.successMsg = 'User updated!';
                    this.$auth.fetchUser();
                    this.$swal({
                        type: 'success',
                        text: this.successMsg
                    });
                }
            })
            .catch(err => {
                console.log(err.response.data);
                this.errors = err.response.data.errors;
            })
        }
    }
};
</script>
<style></style>
