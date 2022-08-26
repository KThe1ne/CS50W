import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import "chartjs-adapter-moment";
ChartJS.register(...registerables);

function LineGraph() {
  let period = "4hour";
  let symbol = "BTC-USDT";

  let data = [];

  fetch(`getPriceHistory/${symbol}/${period}`)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result)

      result.data.forEach((element) => {
        let date = new Date(element[0] * 1000);
        data.push({
          x: date,
          y: element[3],
        });
      });

      console.log(data);
    });

  // data.reverse();

  return (
    <div>
      Line Graph!!!
      <Line
        data={{
          datasets: [
            {
              type: "line",
              data: data,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              type: "time",
              time: {
                // format: "MM/DD/YY",
                tooltipFormat: "ll",
                unit: "day",
              },
              adapters: {
                /* date: {
                  locale: enUS,
                }, */
              },
            },
          },
        }}
      />
    </div>
  );
}

export default LineGraph;
