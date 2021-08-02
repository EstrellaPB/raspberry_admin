import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import Vue from "vue";
am4core.useTheme(am4themes_material);

Vue.prototype.$am4core = () => {
    return {
        am4core,
        am4charts
    }
}