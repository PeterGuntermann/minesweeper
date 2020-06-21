import React from 'react';
import './App.css';
import { Minesweeper } from "./components/Minesweeper";

function App() {
    return (<>
        <div className="App">
            <Minesweeper/>
            <footer><p>Made with React.JS</p></footer>
        </div>
    </>);
}

export default App;
