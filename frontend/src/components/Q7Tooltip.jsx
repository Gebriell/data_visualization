import React from "react";

function Q7Tooltip({ data }) {
  return <div className="q7-tooltip">
		<div className="country">
			<h1>{data?.country}</h1>
			<div className="rank">Rank <h2>{data?.rank}</h2></div>
		</div>
		<hr />
		<div className="stats">
			<div className="stats-row">
				Channel Count
				<h2>{data?.channelCounts}</h2>
			</div>
			<div className="stats-row">
				Total Avg. Yearly Earning
				<h2>${data?.totalYearlyEarnings.toLocaleString()}</h2>
			</div>
			<div className="stats-row">
				Most Earning Channel
				<div className="title-and-text">
					<h2>{data?.bestChannel.name}</h2>
					(${data?.bestChannel.avgYearlyEarnings.toLocaleString()})
				</div>
			</div>
		</div>
	</div>;
}

export default Q7Tooltip;
