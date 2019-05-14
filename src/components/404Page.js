import "../css/404Page.css";
import React from "react";
import notFound from "../assets/notFound.png";

export const RandomPage = () => {
  return (
    <div className="ui container">
      <img className="not-found" src={notFound} alt="404 image" />
      <h3 className="content-container content">OOPS! PAGE NOT FOUND.</h3>
    </div>
  );
};
