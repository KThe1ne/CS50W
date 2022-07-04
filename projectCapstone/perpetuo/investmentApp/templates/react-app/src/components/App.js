import React from "react";
import ReactDOM from "react-dom";
import {createRoot} from 'react-dom/client';

function App() {
    return (
       <div>
            <div className="header">
                Testing React!!!
            </div>
       </div> 
    )
}

const root = createRoot(document.querySelector('#app'))
root.render(<App/>)