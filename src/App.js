import React from 'react';
import './styles/App.css';
import { Minesweeper } from "./components/Minesweeper";

function App() {
    return (<>
        <div className="App">
            <header>
                <h1>Minesweeper</h1>
            </header>

            <Minesweeper/>

            <footer>
                <p>Made with React.JS</p>
            </footer>
        </div>
    </>);
}

export default App;
