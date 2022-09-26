import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme} from "@mui/material";
import React from "react";
import App from "./components/App";
import PortfolioPage from "./components/PortfolioPage";
import './index.css';

const theme = createTheme({
    palette: {
        primary: {
            main: "#172A53"
        },
        secondary: {
            main: "#22C55E"
        }
    }
})

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="portfolio" element={<PortfolioPage />} />
      </Routes>
    </ThemeProvider>
    </BrowserRouter>
);
