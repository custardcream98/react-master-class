import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import { useCoinId } from "./Coin";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Chart = () => {
  const { coinId } = useCoinId();
  const { isLoading, data } = useQuery<IHistorical[]>(["history", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const coinData =
    data?.map((price) => [price.time_close * 1000, parseFloat(price.close)]) ??
    [];

  return (
    <div>
      {isLoading ? (
        "차트 로딩중"
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: coinId,
              data: coinData as unknown as number[],
            },
          ]}
          options={{
            theme: {
              mode: "light",
            },
            chart: { height: 500, width: 500, toolbar: { show: false } },
            grid: { show: false },
            stroke: { curve: "smooth", width: 5 },
            xaxis: {
              type: "datetime",
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["blue"],
                stops: [0, 100],
              },
            },
            colors: ["red"],
          }}
        />
      )}
    </div>
  );
};

export default Chart;
