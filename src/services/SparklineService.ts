import dayjs from "dayjs";
import { readonly } from "vue";
import NomicsApiService from "./NomicsApi";

interface SparkLineResult {
  data: {
    currency: string;
    timestamps: string[];
    prices: string[];
  };
  formattedDates: string[];
  formattedPrices: string[];
}

const SparkLineService = {
  /**
   * Get a set of prices for a given date period.
   * Docs ref: https://nomics.com/docs/#operation/getCurrenciesSparkline
   *
   * @param currency The cryptocurrency to query (ie) BTC
   * @param startDate The start date
   * @param endDate The end date
   *
   * @returns
   */
  async getSparkLine(currency = "BTC", startDate = "2020-04-14T00%3A00%3A00Z", endDate = "2021-05-14T00%3A00%3A00Z"): Promise<SparkLineResult> {
    const res = await NomicsApiService().get(`currencies/sparkline?key=${process.env.VUE_APP_NOMICS_API}&ids=${currency}&start=${startDate}&end=${endDate}`);
    const formattedDates = res.data[0].timestamps.map((d: string) => dayjs(d).format("DD/MM/YY"));
    const formattedPrices = res.data[0].prices.map((p: string) => Number(p).toFixed());

    return {
      formattedDates,
      formattedPrices,
      data: res.data[0],
    };
  },
};

export default SparkLineService;
