import React from "react";
import ytlogo from "../assets/yt.jpg";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <section className="title">
        <div className="left">
          <h1>
            Secrets of <br />
            Top 1000 <br />
            YouTube Creators
          </h1>
          <p>A Data Visualization Collection / Group 3</p>
          <p className="description">
            We came up with 7 questions about the stats of the top 1000 YouTube
            creators and answered them with data visualization.
          </p>
          <p className="description">Scroll down to see our findings!</p>
        </div>
        <div className="right">
          <img
            src={ytlogo}
            alt="ytlogo"
            style={{ maxWidth: "75%", maxHeight: "75%" }}
          />
        </div>
      </section>

      <section className="questions">
        <div className="question q1">
          <Link to="/q1">
            <h2>Most Watched Genres</h2>
            <p>Genres most watched and subscribed</p>
          </Link>
        </div>

        <div className="question q2">
          <Link to="/q2">
            <h2>Top Produced Genres</h2>
            <p>What kind of content are they making?</p>
          </Link>
        </div>

        <div className="question q3">
          <Link to="/q3">
            <h2>Top Creator's Homes</h2>
            <p>Which parts of the world do top creators come from, and what are they making? </p>
          </Link>
        </div>

        <div className="question q4">
          <Link to="/q4">
            <h2>Top Genres & Regions</h2>
            <p>Which parts of the world are producing those top genres? </p>
          </Link>
        </div>

        <div className="question q5">
          <Link to="/q5">
            <h2>Genres with the most Potential</h2>
            <p>
              What kind of content do people subscribe to, and makes the most
              money?
            </p>
          </Link>
        </div>

        <div className="question q6">
          <Link to="/q6">
            <h2>Years when Top Creators Emerged</h2>
            <p>
              When were most top channels created, and what kind of channels
              were made?
            </p>
          </Link>
        </div>

        <div className="question q7">
          <Link to="/q7">
            <h2>Places that Makes the Most with YT</h2>
            <p>Where are the creators that make the most?</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;
