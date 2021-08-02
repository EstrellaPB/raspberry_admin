<template>
    <div :id="element" style="width: auto;height: 600px;">
        
    </div>
</template>

<script>

export default {
    name: 'line-chart',
    props: {
        element: {
            type: String,
            default: 'line-chart-element'
        },
        dataElements: {
            type: Array,
            default: []
        },
        series: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            instance: null,
            dimension: 'date',
            am4core: null,
            am4charts: null
        }
    },
    mounted() {
        let {am4core, am4charts} = this.$am4core();
        this.am4core = am4core;
        this.am4charts = am4charts;
        this.init();
    },
    beforeDestroy() {
        if (this.instance) {
        this.instance.dispose();
        }
    },
    methods: {
        async init() {
            if (!!this.element) {
                // Create chart instance
                if (!!this.instance) {
                    this.instance.dispose();
                }
                this.instance = this.am4core.create(this.element, this.am4charts.XYChart);
                // this.instance.language.locale = chartLocale;

                this.instance.language.locale["_decimalSeparator"] = ".";
                this.instance.language.locale["_thousandSeparator"] = ",";

                // Increase contrast by taking evey second color
                this.instance.colors.step = 2;

                // Add data
                this.instance.data = this.generateChartData();

                // Create axes
                var dateAxis = this.instance.xAxes.push(new this.am4charts.DateAxis());
                dateAxis.renderer.minGridDistance = 150;

                // Add scrollbar
                this.instance.scrollbarX = new (this.am4charts).XYChartScrollbar();
                this.instance.scrollbarY = new (this.am4core).Scrollbar();

                // Value Axis
                var valueAxis = this.instance.yAxes.push(new this.am4charts.ValueAxis());
                valueAxis.renderer.line.strokeOpacity = 1;
                valueAxis.renderer.line.strokeWidth = 2;
                valueAxis.renderer.labels.template.fill = this.am4core.color("#000");
                valueAxis.renderer.grid.template.disabled = true;
                valueAxis.renderer.minWidth = 35;
                valueAxis.renderer.line.stroke = this.am4core.color("#000");
                
                // Create series
                this.series.forEach(async function(element){
                    await this.createAxisAndSeries(element.field, element.name, element.opposite, element.bullet, valueAxis);
                }, this)

                // Add legend
                this.instance.legend = new this.am4charts.Legend();

                // Add cursor
                this.instance.cursor = new this.am4charts.XYCursor();

            } else {
                console.error('Problema de inicialización LineChart');
            }
        },
        generateChartData() {
            var chartData = [];
            this.dataElements.forEach(function(item){
                chartData.push(item);
            })

            return chartData;
        },
        createAxisAndSeries(field, name, opposite, bullet, valueAxis) {
            // var valueAxis = this.instance.yAxes.push(new this.am4charts.ValueAxis());

            var series = this.instance.series.push(new this.am4charts.LineSeries());
            series.dataFields.valueY = field;
            series.dataFields.dateX = this.dimension;
            series.strokeWidth = 2;
            series.yAxis = valueAxis;
            series.name = name;
            series.tooltipText = "{name}: [bold]{valueY}[/]";
            series.tensionX = 1;

            this.instance.scrollbarX.series.push(series);

            var interfaceColors = new this.am4core.InterfaceColorSet();

            switch(bullet) {
                case "triangle":
                    var bullet = series.bullets.push(new this.am4charts.Bullet());
                    bullet.width = 12;
                    bullet.height = 12;
                    bullet.horizontalCenter = "middle";
                    bullet.verticalCenter = "middle";

                    var triangle = bullet.createChild(this.am4core.Triangle);
                    triangle.stroke = interfaceColors.getFor("background");
                    triangle.strokeWidth = 2;
                    triangle.direction = "top";
                    triangle.width = 12;
                    triangle.height = 12;
                    break;
                case "rectangle":
                    var bullet = series.bullets.push(new this.am4charts.Bullet());

                    var rectangle = bullet.createChild(this.am4core.Rectangle);
                    rectangle.width = 10;
                    rectangle.height = 10;
                    rectangle.horizontalCenter = "middle";
                    rectangle.verticalCenter = "middle";
                    break;
                case "none":
                    var bullet = series.bullets.push(new this.am4charts.Bullet());
                    break;
                default:
                    var bullet = series.bullets.push(new this.am4charts.CircleBullet());
                    bullet.circle.stroke = interfaceColors.getFor("background");
                    bullet.circle.strokeWidth = 2;
                    break;
            }

            // valueAxis.renderer.line.strokeOpacity = 1;
            // valueAxis.renderer.line.strokeWidth = 2;
            // valueAxis.renderer.line.stroke = series.stroke;
            // // valueAxis.renderer.labels.template.fill = series.stroke;
            // valueAxis.renderer.labels.template.fill = this.am4core.color("#000");
            // valueAxis.renderer.opposite = opposite;
            // valueAxis.renderer.grid.template.disabled = true;
            // valueAxis.renderer.minWidth = 35;
            // valueAxis.renderer.line.stroke = this.am4core.color("#000");

            return valueAxis;
        }
    },
    watch: { 
        dataElements: function(newVal, oldVal) { // watch it
            console.log('Prop changed: ', newVal, ' | was: ', oldVal);
            this.init();
        }
    }
}
</script>