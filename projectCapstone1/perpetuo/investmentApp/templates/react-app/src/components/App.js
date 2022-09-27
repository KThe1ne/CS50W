import React from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "../../dist/output.css";

import Header from "./Header.js";
import LineGraph from "./LineGraph.js";

export default function App() {
  return (
    <div>
      <Header />
      <LineGraph />
    </div>
  );
}
