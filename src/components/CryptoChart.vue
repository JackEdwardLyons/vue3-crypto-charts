<template>
  <section>
    <h1>Crypto tracker chart for {{ username }}</h1>

    <div :class="$style.textCenter">
      <apexchart style="width: 80%; max-width: 1200px" type="area" :options="chartOptions" :series="[sparklineSeries]" />
    </div>
  </section>
</template>

<script lang="ts">
import { inject, reactive, onMounted, ref, Ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import SparkLineService from "../services/SparklineService";
import dayjs from "dayjs";
import { setSparkLineAxes, SparkLineModel } from "../utils/sparkline";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const sparkLineData = ref<SparkLineModel[]>([]);

    onMounted(async () => {
      const data = await SparkLineService.getSparkLine("ETH");
      const formattedDates = data[0].timestamps.map((d) => dayjs(d).format("DD/MM/YY"));
      const formattedPrices = data[0].prices.map((p) => Number(p).toFixed());

      sparkLineData.value = setSparkLineAxes(formattedDates, formattedPrices);
    });

    const chartOptions = reactive({
      chart: {
        id: "vuechart-example",
      },
    });

    const sparklineSeries = reactive({
      name: "sparkline-series",
      data: sparkLineData,
    });

    const username = inject("username");

    return {
      chartOptions,
      sparklineSeries,
      username,
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
