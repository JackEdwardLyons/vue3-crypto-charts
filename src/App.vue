<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>A charts demo which has a dropdown of crypto's to select and then you can see the history of the coin price on a chart.</p>
    <crypto-chart />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CryptoChart from "./components/CryptoChart.vue";

export default defineComponent({
  name: "App",
  components: { CryptoChart },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
