import React from "react";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import { useEffect } from "react";

function LineGraph() {
  const [data, setData] = useState({});
  //https://disease.sh/v3/covid-19/historical/all?lastdays=120
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

//   const buildChartData =  (data, casesType='cases') =>{
//       const chartData = [];
//       let lastDataPoint;
//       data[casesType].forEach(date=>{
//           if (lastDataPoint){
//             const newDataPoint = {
//                 x: date, 
//                 y: data[casesType][date] - lastDataPoint
//             }
//             lastDataPoint = data['cases'][date];
//           }
//           chartData.push(newDataPoint);

//       })
//       return chartData;
//   };

const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  return (
    <div>
      {/* <Line
        data
        options
        /> */}
      <h1>Im graf</h1>
    </div>
  );
}

export default LineGraph;
