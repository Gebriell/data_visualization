import React from "react";
import { Link } from "react-router-dom";

function WithFooter({ children, prev, next }) {
  return (
    <div className="container">
      {children}
      <div className="footer">
        <div className="footer-left"><h2><Link to={prev.link}>{`${prev?.title}`}</Link></h2></div>
        <div className="footer-right"><h2><Link to={next.link}>{`${next?.title}`}</Link></h2></div>
      </div>
    </div>
  );
}

export default WithFooter;
