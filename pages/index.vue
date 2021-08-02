<template>
  <div>
    <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total lectures"
            type="gradient-red"
            :sub-title="String(lecturesData.length)"
            icon="ni ni-collection"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-nowrap">{{ filters.dates == $moment().format('YYYY-MM-DD') ? 'Today' : filters.dates }}</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <card type="" header-classes="bg-white">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-dark text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-dark mb-0">Sensor Data</h5>
                <div class="row">
                  <div class="col-md-6">
                    <label>Date</label>
                    <base-input addon-left-icon="ni ni-calendar-grid-58">
                      <flat-picker
                        :config="{allowInput: true, onValueUpdate: changeDates}"
                        v-model="filters.dates"
                        class="form-control datepicker"
                      ></flat-picker>
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <base-dropdown-select
                        label="Device"
                        :options="devices"
                        placeholder="Select device to filter results"
                        v-model="device">
                    </base-dropdown-select>
                  </div>
                </div>
              </div>
            </div>
            <am-line-chart
              ref="lecturesDataChart"
              element="lectures-data"
              :dataElements="amChartsData.lineChart.data"
              :series="amChartsData.lineChart.series"
            ></am-line-chart>
          </card>
        </div>
      </div>
      <!-- End charts-->
    </div>
  </div>
</template>
<script>
// Charts
import AmLineChart from "~/components/AmCharts/LineChart";

// Tables
import SocialTrafficTable from "~/components/Dashboard/SocialTrafficTable";
import PageVisitsTable from "~/components/Dashboard/PageVisitsTable";
import { mapState } from "vuex";

import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  layout: "DashboardLayout",
  components: {
    PageVisitsTable,
    SocialTrafficTable,
    AmLineChart,
    flatPicker
  },
  async asyncData({$axios, params}) {
      var { devices } = await $axios.$get('/device');
      devices = await devices.map(device => {
          let name = device.name || '?'
          return { name: `${name} - ${device.mac_address}`, value: device.mac_address }
      });

      devices.push({ name: 'Any device', value: '' });

      return { devices };
  },
  data() {
    return {
      device: null,
      amChartsData: {
        lineChart: {
          data: [],
          series: [
            {
              field: "power_data_1",
              name: "Performance Data 1",
              opposite: false,
              bullet: "none"
            },
            {
              field: "power_data_2",
              name: "Performance Data 2",
              opposite: false,
              bullet: "none"
            },
            {
              field: "power_data_3",
              name: "Performance Data 3",
              opposite: false,
              bullet: "none"
            }
          ]
        }
      }
    };
  },
  async created() {
    this.amChartsData.lineChart.data = this.lecturesData;

    this.amChartsData.lineChart.series = [
      {
        field: "power_data_1",
        name: "Performance Data 1",
        opposite: false,
        bullet: "none"
      },
      {
        field: "power_data_2",
        name: "Performance Data 2",
        opposite: false,
        bullet: "none"
      },
      {
        field: "power_data_3",
        name: "Performance Data 3",
        opposite: false,
        bullet: "none"
      }
    ];
  },
  async fetch({ store, params }) {
    await store.dispatch("lectures/fetchLecturesLineChart");
  },
  computed: {
    ...mapState({
      lecturesData: state => state.lectures.allGraphData,
      datesFilter: state => state.lectures.filters.dates,
      filters: function(state) {
          return {
              dates: this.datesFilter,
              device: null
          }
      }
    })
  },
  watch: {
    device: function(newValue, oldValue) {
      this.filters.device = newValue
      this.changeFilters()
    }
  },
  methods: {
    changeDates: async function(selectedDates, dateStr, instance) {
      this.filters.dates = dateStr;
      this.changeFilters();
    },
    changeFilters: async function() {
      await this.$store.dispatch("lectures/fillFilters", { filters: this.filters });
      await this.$store.dispatch("lectures/fetchLecturesLineChart");
      this.amChartsData.lineChart.data = this.$store.state.lectures.allGraphData;
    }
  }
};
</script>
<style></style>
