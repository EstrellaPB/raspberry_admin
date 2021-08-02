<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-body px-lg-5 py-lg-5 mb-2">
                        <div class="text-center text-muted mb-4">
                            <small>Sign in with credentials</small>
                        </div>
                        <form role="form" @submit.prevent="login">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        alternative
                                        :valid="isValid('email')"
                                        :error="!!errors.email ? errors.email.msg : ''"
                                        v-model="model.email" required>
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        alternative
                                        :valid="isValid('password')"
                                        :error="!!errors.password ? errors.passoword.msg : ''"
                                        v-model="model.password" required>
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button type="primary" class="my-4" nativeType="submit" :disabled="isLoading">
                                    <font-awesome-icon v-if="isLoading" :icon="['fas', 'spinner']" spin/>
                                    Sign in
                                </base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3 mb-5">
                    <!-- <div class="col-6">
                        <a href="#" class="text-light"><small>Forgot password?</small></a>
                    </div> -->
                    <!-- <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
                    </div> -->
                </div>
            </div>
        </div>
</template>
<script>
  export default {
    name: 'login',
    layout: 'AuthLayout',
    data() {
      return {
        model: {
          email: '',
          password: '',
        },
        errors: {},
        isLoading: false
      }
    },
    methods: {
        login() {
            this.isLoading = true
            this.$auth.loginWith('local', { data: { email: this.model.email, password: this.model.password, gethash: true } })
            .then(() => console.log('Logged In!'))
            .catch((err) => {
                console.log(err);
                if (err.response && err.response.data.errors) {
                    this.errors = err.response.data.errors;
                } else if(err.response && err.response.data.message) {
                    this.$swal({
                        type: 'error',
                        text: err.response.data.message
                    });
                } else {
                    this.$swal({
                        type: 'error',
                        text: 'Login Failed. Try again.'
                    });
                }
            })
            .finally(() => {
                this.isLoading = false;
            })
        },
        isValid(prop) {
            return !this.errors && !this.errors.length > 0 && !(`${prop}` in this.errors) && this.model[prop] != ''
        }
    }
  }
</script>
<style>
</style>
