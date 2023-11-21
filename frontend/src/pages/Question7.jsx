import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import Q7Tooltip from "../components/Q7Tooltip";

function Question7() {
  const [dataForDisplay, setDataForDisplay] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [pending, setPending] = useState(true);
  const [tooltipData, setTooltipData] = useState(null);

  // fetch the data from the backend
  useEffect(() => {
    fetch("http://localhost:3000/q7")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        // console.log(data.dataForDisplay, data.topTenCountries);
        setDataForDisplay(data);
        setPending(false);
      });

    // prepare the map data too
    d3.json(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
    ).then((data) => setMapData(data));
  }, []);

  // render the map when both dataForDisplay and mapData are ready
  const svgReference = useRef();
  useEffect(() => {
    if (!dataForDisplay || !mapData) return;

    const [width, height] = [640, 300];

    // the canvas
    const svg = d3
      .select(svgReference.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .on("click", reset)

    //specify the projection
    const path = d3.geoPath(
      d3
        .geoMercator()
        .scale(90)
        .translate([width / 2, height / 1.5])
    );

    // the base map with all countries
    const base = svg.append("g");

    // our countries
    const countries = topojson.feature(mapData, mapData.objects.countries);

    // helpers to determine if the country is in the top 10
    const topTenCountries = dataForDisplay.topTenCountries;
    const partialMatch = (a, b) => b.includes(a);
    const isTopTen = (country) =>
      topTenCountries.some((c) => partialMatch(c, country));

    // draw the base map
    base
      .selectAll("path")
      .data(countries.features)
      .enter() // for each feature...
      .append("path")
      .attr("d", path)
      .attr("class", "country")
      .attr("fill", "#eee")
      .attr("stroke", "#aaa");

    // draw the top 10 countries
    const topTen = base.append("g");
    const colorScale = d3.scaleLinear().domain([1, 10]).range(["#ff7f00", "#ffeda0"]);
    topTen
      .selectAll("path")
      .data(countries.features.filter((d) => isTopTen(d.properties.name)))
      .enter()
      .append("path")
      .attr("d", path)
      // fill based on the rank, with different shades of orange
      .attr("fill", (d) => {
        const rank = topTenCountries.findIndex((c) => partialMatch(c, d.properties.name));
        return colorScale(rank);
      })
      .attr("class", "country")
      .attr("class", "top-ten")
			.attr('cursor', 'pointer')
			.on("click", clicked);
    
    // zoom functionality
    // example followed: https://observablehq.com/@d3/zoom-to-bounding-box?intent=fork
    const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);
    svg.call(zoom);

    function reset() {
			// return if the clicked target is in the top 10
			// if (event.target.classList.contains("top-ten")) return;

      // de-emphasize the top 10 countries
      topTen.selectAll("path").transition().style("fill", null);

      svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
      );
      // console.log("reset");
      // hide the tooltip
      const tooltip = d3.select(".q7-tooltip");
      tooltip.style("visibility", "hidden");
      tooltip.style("opacity", 0);
    }

		function clicked(event, d) {
			// console.log(event, d);
      const [[x0, y0], [x1, y1]] = path.bounds(d);
      event.stopPropagation();
      // base.transition().style('fill', null);

      reset();

      // emphasize the clicked country
      d3.select(this).transition().style("fill", "#f00");

      // zoooooom
      svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(
            Math.min(
              8,
              0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)
            )
          )
          .translate(-(x0 + x1) / 2 - (x1 - x0) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node())
      );

      // show and fill the tooltip
      const tooltip = d3.select(".q7-tooltip");
      const svgRect = svg.node().getBoundingClientRect();
      const svgHeight = svgRect.height;
      const svgWidth = svgRect.width;
      const tooltipHeight = svgHeight;
      const tooltipWidth = svgWidth * 0.3;

      tooltip.style("visibility", "visible");
      tooltip.style("opacity", 1);
      tooltip.style("height", `${tooltipHeight}px`);
      tooltip.style("width", `${tooltipWidth}px`);
      tooltip.style("left", `${svgRect.right - tooltipWidth}px`);
      tooltip.style("top", `${svgRect.top + (svgHeight - tooltipHeight)}px`);

      // fill in the content
      const countryData = dataForDisplay.dataForDisplay.find(item => partialMatch(item.country, d.properties.name));
      console.log(countryData);
      setTooltipData(countryData);
		}

    function zoomed(event) {
      const { transform } = event;
      base.attr("transform", transform);
      base.attr("stroke-width", 1 / transform.k);
    }

  }, [dataForDisplay, mapData]);

  return (
    <div>
      <h1>Which Parts of the World Made the Most with YT?</h1>
      {!pending && <svg className="q7-worldmap" ref={svgReference}></svg>}
      <p>Click on any highlighted region for details!</p>
      <Q7Tooltip data={tooltipData} />
    </div>
  );
}

export default Question7;
