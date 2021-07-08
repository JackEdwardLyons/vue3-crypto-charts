<template>
  <section>
    <h1>Crypto tracker chart</h1>

    <select name="cryptocurrency-select" id="cryptocurrency-select" :class="$style.select" v-model="cryptoChoice">
      <option v-for="coin in coins" :value="coin" :key="coin" v-text="coin" />
    </select>

    <div :class="$style.textCenter">
      <apexchart style="width: 80%; max-width: 1200px" type="area" :options="chartOptions" :series="[sparklineSeries]" />
    </div>
  </section>
</template>

<script lang="ts">
import { reactive, watchEffect, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import SparkLineService from "../services/SparklineService";
import { setSparkLineAxes } from "../utils/sparkline";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const sparkLineData = ref<any>([]);
    const fetchStatus = ref("idle");
    const cryptoChoice = ref("BTC");
    const coins = ref(["BTC", "ETH", "XRP", "COMP", "KSM"]);

    watchEffect(async () => {
      fetchStatus.value = "fetching";
      try {
        const { formattedDates, formattedPrices } = await SparkLineService.getSparkLine(cryptoChoice.value);
        sparkLineData.value = setSparkLineAxes(formattedDates, formattedPrices);
        fetchStatus.value = "success";
      } catch (error) {
        fetchStatus.value = "error";
        console.log({ error });
      }
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

    return {
      chartOptions,
      sparklineSeries,
      cryptoChoice,
      coins,
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

.select {
  padding: 1rem;
}
</style>
