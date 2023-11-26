import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';


const Question4 = () => {

    const svgRef = useRef();

    const [ selectedDataset, setSelectedDataset ] = useState("Entertainment");
    const [ chartData, setChartData ] = useState([]);


    useEffect( () => {
        fetch(`http://localhost:3000/q4/${selectedDataset}`)
        .then((response) => response.json())
        .then((data) => {
          setChartData(data);
        });
    
      }, [selectedDataset]);


    useEffect(() => {
        
        // clear previous chart
        d3.select(svgRef.current).selectAll('*').remove();

        const formatPercentage = d3.format('.2%');

        const w = 500;
        const h = 500;
        const radius = w/2;
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('overflow', 'visible')
            .style('margin-top', '400px')
            .style('margin-left', '400px');

        const formatterData = d3.pie().value(d => d.value)(dataArray);
        const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
        const color = d3.scaleOrdinal().range(d3.schemeSet2);

        svg.selectAll()
           .data(formatterData)
           .join('path')
           .attr('d', arcGenerator)
           .attr('fill', d => color(d.value))
           .style('opacity', 0.7);

        svg.selectAll()
           .data(formatterData)
           .join('text')
           .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
           .text((d) => formatPercentage(`${((d.endAngle - d.startAngle) / (2 * Math.PI))}`))
           .style('text-anchor', 'middle');

        
        const legend = svg
           .selectAll('.legend')
           .data(color.domain())
           .enter()
           .append('g')
           .attr('class', 'legend')
           .attr('transform', (_, i) => `translate(0,${i * 20})`);
 
         legend
           .append('rect')
           .attr('x', w - 18)
           .attr('width', 18)
           .attr('height', 18)
           .style('fill', color);
 
         legend
           .append('text')
           .data(formatterData)
           .attr('x', w - 24)
           .attr('y', 9)
           .attr('dy', '.35em')
           .style('text-anchor', 'end')
           .text(d  => d.data.property);
        

    }, [chartData]);


    const handleRadioChange = (e) => {
        setSelectedDataset(e.target.value)
    }

    const dataArray = Array.from(chartData).map(([property, value]) => ({ property, value }));
 
    return (
    <div>
        
    <div>

        <label>
          <input
            type="radio"
            value="Entertainment"
            checked={selectedDataset === 'Entertainment'}
            onChange={handleRadioChange}
          />
          Entertainment
        </label>
        <label>
          <input
            type="radio"
            value="Music"
            checked={selectedDataset === 'Music'}
            onChange={handleRadioChange}
          />
          Music
        </label>
        <label>
          <input
            type="radio"
            value="People & Blogs"
            checked={selectedDataset === 'People & Blogs'}
            onChange={handleRadioChange}
          />
          People and Blogs
        </label>
        <label>
          <input
            type="radio"
            value="Gaming"
            checked={selectedDataset === 'Gaming'}
            onChange={handleRadioChange}
          />
          Gaming
        </label>
        <label>
          <input
            type="radio"
            value="Comedy"
            checked={selectedDataset === 'Comedy'}
            onChange={handleRadioChange}
          />
          Comedy
        </label>
        <label>
          <input
            type="radio"
            value="Film & Animation"
            checked={selectedDataset === 'Film & Animation'}
            onChange={handleRadioChange}
          />
          Film and Animation
        </label>
        <label>
          <input
            type="radio"
            value="Education"
            checked={selectedDataset === 'Education'}
            onChange={handleRadioChange}
          />
          Education
        </label>
        <label>
          <input
            type="radio"
            value="Howto & Style"
            checked={selectedDataset === 'Howto & Style'}
            onChange={handleRadioChange}
          />
          How to and Style
        </label>

    
      </div>
        <svg ref={svgRef}></svg>
    </div>

    )
};


export default Question4;