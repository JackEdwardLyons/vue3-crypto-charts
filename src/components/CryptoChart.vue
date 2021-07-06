<template>
  <section>
    <h1>Crypto tracker chart</h1>
    <button @click="updateSeriesValues">update chart values</button>
    <div :class="$style.textCenter">
      <apexchart width="500" type="area" :options="chartOptions" :series="[series]" />
    </div>
  </section>
</template>

<script>
import { reactive } from "vue";
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  setup(props) {
    const chartOptions = reactive({
      chart: {
        id: "vuechart-example",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    });

    const series = reactive({
      name: "series-1",
      data: [30, 40, 35, 50, 49, 60, 70, 91],
    });

    const updateSeriesValues = () => {
      // as a ref
      // series.value[0].data = [30, 40, 35, 50, 49, 60, 70, 200];

      // as a reactive
      series.data = [30, 40, 35, 50, 49, 60, 70, 200];
    };

    return {
      chartOptions,
      series,
      updateSeriesValues,
    };
  },
};
</script>

<style lang="scss" module>
.textCenter {
  margin: 0 auto;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
