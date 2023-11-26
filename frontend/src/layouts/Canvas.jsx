import React from "react";
import { Route, Routes } from "react-router-dom";
import Question6 from "../pages/Question6";
import Navbar from "../components/Navbar";
import Question7 from "../pages/Question7";
import Question7Canvas from "../pages/Question7Canvas";
import WithFooter from "./WithFooter";
import Landing from "../pages/Landing";
import Question3 from '../pages/Question3'
import Question4 from '../pages/Question4'

/**
 * This canvas is the main container for all the pages including the navbar
 * Register all your pages here!
 */

function Canvas() {
  return (
    <div className="canvas">
      <Navbar />

      <div className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/q3"
            element={
              <WithFooter
                children={<Question3 />}
                prev={{ link: "/q2", title: "Q2" }}
                next={{ link: "/q4", title: "Q4" }}
              />
            }
          />
          <Route
            path="/q4"
            element={
              <WithFooter
                children={<Question4 />}
                prev={{ link: "/q3", title: "Q3" }}
                next={{ link: "/q5", title: "Q5" }}
              />
            }
          />
          <Route
            path="/q6"
            element={
              <WithFooter
                children={<Question6 />}
                prev={{ link: "/q5", title: "Q5" }}
                next={{ link: "/q7", title: "Q7" }}
              />
            }
          />
          <Route
            path="/q7"
            element={
              <WithFooter
                children={<Question7 />}
                prev={{ link: "/q6", title: "Q6" }}
                next={{ link: "", title: "" }}
              />
            }
          />
          <Route path="*" element={<h1>404!</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default Canvas;
