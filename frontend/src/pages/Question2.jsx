
import React, { useEffect, useState, useRef } from "react";
import Chart from 'chart.js/auto';

function Question2() {
  const [dataDisp, setDataDisp] = useState({
    top5: { labels: [], datasets: [] },
    top10: { labels: [], datasets: [] },
    topAll: { labels: [], datasets: [] },
  });
  const [currentChart, setCurrentChart] = useState('topAll');
  const [pending, setPending] = useState(true);
  const chartRef = useRef();

  useEffect(() => {
    fetch("http://localhost:3000/q2")
      .then((resp) => resp.json())
      .then((data) => {
        setDataDisp(data);
        setPending(false);
      });
  }, []);

  useEffect(() => {
    if (!pending && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const chartInstance = new Chart(ctx, {
        type: 'pie',
        data: dataDisp[currentChart],
      });
      return () => chartInstance.destroy(); // Cleanup previous chart instance
    }
  }, [dataDisp, currentChart, pending]);

  function handleChartChange(chartType) {
    setCurrentChart(chartType);
  }

  const chartStyle = {
    maxHeight: '80vh', // Adjust as needed for responsiveness
    maxWidth: '100%', // Adjust as needed for responsiveness
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90%' 
    }}>
  
      <h2>Top 5, Top 10 and All Genres by Size</h2>
  
      <div>
        <button onClick={() => handleChartChange('top5')}>Top 5</button>
        <button onClick={() => handleChartChange('top10')}>Top 10</button>
        <button onClick={() => handleChartChange('topAll')}>All</button>
      </div>
  
      <div style={{width: '45%'}}>
        {pending ? (
          <p>Loading...</p>  
        ) : (
          <canvas ref={chartRef} />
        )}
      </div>
  
    </div>
  );
}

export default Question2;
