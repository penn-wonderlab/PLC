import "../css/RootText.css";
import React from "react";
import { Link } from "react-router-dom";

const RootText = () => {
  return (
    <div className="root-text">
      <div className="text-content">
        <h1 className="text-content-pri">
          Build Personal Learning <br /> Network, <br />
          With Anyone, <br />
          Anywhere<a className="text-color">.</a>
        </h1>
        <p className="text-content-sub">
          Discover and explore{" "}
          <a className="text-color">new learning resources of insterest.</a>{" "}
          <br /> Link{" "}
          <a
            className="text-color"
            href="https://web.hypothes.is/"
            target="_blank"
          >
            Hypothesis{" "}
          </a>
          right now to create your learning network
          <br /> by connecting with people sharing the same learning
          <br /> interest, ideas and resources.
        </p>
        <Link to="/login">
          <button className="ui primary button root-button">GET STARTED</button>
        </Link>
      </div>
    </div>
  );
};

export default RootText;
