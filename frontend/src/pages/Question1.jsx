/*
* Q1: Genres most watched / most likely to gain views
*/

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Question1() {
  const [genres, setGenres] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3000/q1')
      .then(res => res.json())
      .then(data => {
        const chartData = {
          labels: data.labels,
          datasets: [{
            label: 'Views by Genre',
            data: data.datasets.map(item => item.data),
            backgroundColor: data.datasets.map(item => item.backgroundColor),
            // Add a hidden property for legend to show colors
            hidden: false,
          }],
        };
        setGenres(chartData);
      });
  }, []);

  useEffect(() => {
    if (genres) {
      const ctx = chartContainer.current.getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        labels: genres.labels,
        data: genres,
        options: {
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false,
              position: 'right',
              labels: {
                boxWidth: 10, // Adjust box width for legend colors
                usePointStyle: true, // Use point style for legend
              },
            },
        },
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Views',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Genres',
              },
            },
          },
        },
      });
    }
  }, [genres]);

  return (
    <div>
        <h1>Which genres are most likely to be watched?</h1>
        <canvas ref={chartContainer} width="100%" height="50%" />
    </div>
  );
}

export default Question1;
