import React from "react";
import ReactDOM from "react-dom";
import {createRoot} from 'react-dom/client';
import '../../dist/output.css';

import Header from './Header.js';
import LineGraph from "./LineGraph";

function App() {
    let test = {};

    fetch("/apiTest", )
    .then(response => {test = response.json()})

    console.log(test)

    return (
       <div>
            <Header/>
            <LineGraph/>
       </div> 
    )
}

const root = createRoot(document.querySelector('#app'))
root.render(<App/>)