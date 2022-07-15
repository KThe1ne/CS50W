import React from "react";
import ReactDOM from "react-dom";
import {createRoot} from 'react-dom/client';
import '../../dist/output.css';

import Header from './Header.js';

function App() {
    return (
       <div>
            <Header/>
            <div className="text-3xl font-bold underline">
                Testing React
            </div>
       </div> 
    )
}

const root = createRoot(document.querySelector('#app'))
root.render(<App/>)