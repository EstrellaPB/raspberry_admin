<template>
    <div>
        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8 text-right">
            <!-- Card stats -->

        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Create device</h3>
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
                            <form @submit.prevent="saveDevice" autocomplete="off">
                                <h6 class="heading-small text-muted mb-4">Device information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <base-input alternative
                                                        label="Name"
                                                        placeholder="Name of the device"
                                                        input-classes="form-control-alternative"
                                                        v-model="device.name"
                                                        required              
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="IP Address"
                                                        placeholder="Network IP"
                                                        input-classes="form-control-alternative"
                                                        v-model="device.ip"
                                                        :mask="{alias: 'ip', greedy: true}"
                                                        required
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="MAC Address"
                                                        placeholder="Device unique MAC"
                                                        input-classes="form-control-alternative"
                                                        v-model="device.mac_address"
                                                        :mask="{alias: 'mac', greedy: true}"
                                                        autocomplete="off"
                                                        required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div class="pl-lg-4">
                                    <div class="row justify-content-center">
                                        <div class="col-lg-6 text-center">
                                            <base-button type="success" class="my-4" nativeType="submit">
                                                Save device
                                            </base-button>
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
export default {
    layout: 'DashboardLayout',
    async asyncData({$axios, params}) {
        var { device } = await $axios.$get(`/device/${params.id}`);

        return { device: device };
    },
    data() {
      return {
        errors: null,
        successMsg: null
      }
    },
    methods: {
        saveDevice() {
            this.$axios.$post(`/device/${this.device._id}/update`, this.device).then((response) => {
                if (response.device) {
                    this.errors = null;
                    this.successMsg = 'Device updated!';
                    this.$swal({
                        type: 'success',
                        text: this.successMsg
                    });
                    this.$router.push({
                        path: '/device'
                    })
                }
            })
            .catch(err => {
                this.errors = []
                if (err.response.data.errors) {
                    this.errors = err.response.data.errors
                } else {
                    this.errors[0] = { msg: err.response.data.message }
                }
            })
        }
    }
};
</script>