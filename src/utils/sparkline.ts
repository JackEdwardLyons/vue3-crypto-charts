export type SparkLineModel = {
  x: string;
  y: string;
};

export function setSparkLineAxes(sparkLineDates: any, sparkLinePrices: any): Array<SparkLineModel> {
  const sparkLineData = [];

  for (let i = 0; i < sparkLineDates.length; i++) {
    sparkLineData.push({
      x: sparkLineDates[i],
      y: sparkLinePrices[i],
    });
  }

  return sparkLineData;
}
