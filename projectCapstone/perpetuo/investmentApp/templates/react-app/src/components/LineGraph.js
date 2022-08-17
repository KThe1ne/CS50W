import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js'
ChartJS.register(...registerables);

function LineGraph() {

  let period = "4hour"
  let symbol = "BTC-USDT"

  let data = []

  fetch(`getPriceHistory/${symbol}/${period}`)
  .then(response => response.json())
  .then(result => {

      console.log(result)
   
      result.data.forEach(element => {
        data.push({
          x: element[0],
          y: element[3]
        })
      });

      console.log(data)
    })
  
    data.reverse()
  
  return (
    <div>
      Line Graph!!
      <Line 
        data={{
          datasets: [
            {
              type: "line",
              data: data
            }
          ]
        }}/>
    </div>
  )
}

export default LineGraph