import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';

function Question2() {
  const [dataDisp, setDataDisp] = useState({
    top5: { labels: [], datasets: [] },
    top10: { labels: [], datasets: [] },
    topAll: { labels: [], datasets: [] },
  });
  const [currentChart, setCurrentChart] = useState('topAll');
  const [pending, setPending] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/q2")
      .then((resp) => resp.json())
      .then((data) => {
        setDataDisp(data);
        setPending(false);
      });
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('pieChart');
    new Chart(ctx, {
        type: 'pie',
        data: dataDisp[currentChart],
    }); [dataDisp, currentChart]

    try {
        new Chart(ctx, {
            type: 'pie',
            data: dataDisp[currentChart],
        });
    } catch (error) {
        console.log(error);
    }}, [dataDisp, currentChart]);

    function handleTop5() {
        setCurrentChart('top5');
    }
  
    function handleTop10() {
    setCurrentChart('top10');
  }

    function handleTopAll() {
        setCurrentChart('topAll');
    }

  return (
    <div>
      <div>
        <button onClick={() => handleTop5()}>Top 5</button>
        <button onClick={() => handleTop10()}>Top 10</button>
        <button onClick={() => handleTopAll()}>Top All</button>
      </div>
      <div>
        {pending ? (
          <p>Loading...</p>
        ) : (
          <canvas id="pieChart" width="400" height="400"></canvas>
        )}
      </div>
    </div>
  );
}

export default Question2;
