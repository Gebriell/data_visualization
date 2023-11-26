import React from "react";
import { Route, Routes } from "react-router-dom";
import Question1 from '../pages/Question1'
import Question2 from '../pages/Question2'
import Question3 from '../pages/Question3'
import Question4 from '../pages/Question4'
import Question5 from '../pages/Question5'
import Question6 from "../pages/Question6";
import Question7 from "../pages/Question7";
import Navbar from "../components/Navbar";
import WithFooter from "./WithFooter";
import Landing from "../pages/Landing";

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
            path="/q1"
            element={
              <WithFooter
                children={<Question1 />}
                prev={{ link: "/", title: "Landing" }}
                next={{ link: "/q2", title: "Q2" }}
              />
            }
          />
          <Route
            path="/q2"
            element={
              <WithFooter
                children={<Question2 />}
                prev={{ link: "/q1", title: "Q1" }}
                next={{ link: "/q3", title: "Q3" }}
              />
            }
          />        
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
            path="/q5"
            element={
              <WithFooter
                children={<Question5 />}
                prev={{ link: "/q4", title: "Q4" }}
                next={{ link: "/q6", title: "Q6" }}
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
                next={{ link: "/", title: "Landing" }}
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
