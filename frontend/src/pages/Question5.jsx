import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Question5() {
  const [genres, setGenres] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3000/q5')
      .then(res => res.json())
      .then(data => {
        setGenres(data);
      });
  }, []);

  useEffect(() => {
    if (genres) {
      const labels = genres.labels;
      const datasets = genres.datasets;

      const ctx = chartContainer.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              data: datasets.map(item => item.data),
              backgroundColor: datasets.map(item => item.backgroundColor )
            }
          ],
        },
        options: {
            stacked: false,
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
                text: 'Subscribers',
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
      <h1>Which genres are most likely to be subscribed to?</h1>
      <canvas ref={chartContainer} width="100%" height="50%" />
    </div>
  );
}

export default Question5;
