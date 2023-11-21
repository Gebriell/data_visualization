import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar} from "react-chartjs-2";

function Question6() {
  /**
   * Q6: When do most YouTube channels get created?
   * stacked bar graph, x axis = year, y axis = # of creators,
   * each bar represents a year, each bar is stacked by the number of channels created in that year
   * user can hover over each bar to see the exact number of channels created in that year
   * additionally, a dropdown menu can be added to allow user to select a specific category
   * what the backend needs to do:
   * From the CSV file, count how many channels were created in each year by counting the number of rows with the same year
   * When a category is selected, count how many channels were created in each year in that category
   *
   * initial thoughts:
   * have the backend return all the numbers of channels created in each year
   * in the form of a JSON object with the genre as the key and the array of numbers as the value
   * do the filtering in the frontend
   */

	// chartjs setup
	ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

	const [dataDisp, setDataDisp] = useState({
		labels: [],
		datasets: [],
	});

	const [pending, setPending] = useState(true);
	
  useEffect(() => {
    fetch("http://localhost:3000/q6")
		.then((resp) => {
			// console.log(resp);
			return resp.json();
		})
		.then((data) => {
			// console.log(data.dataForDisplay);
			setDataDisp(data.dataForDisplay);
			setPending(false);
		});
  }, []);
	// quick fact I just found: React 18 runs useEffect twice in strictmode

	const options = {
    plugins: {
      title: {
        display: true,
        text: "Year vs Genres of Channels Created",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div>
      <h1>Genres of top channels and when they were created</h1>
			{
				// render bar graph if data is ready
				!pending && <Bar data={dataDisp} options={options} />
			}
    </div>
  );
}

export default Question6;
