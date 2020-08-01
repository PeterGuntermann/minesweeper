import React from 'react';
import './styles/App.scss';
import { Minesweeper } from './components/Minesweeper';

function App() {
    return (
        <>
            <div className="App">
                <header>
                    <section className="left">
                        <a
                            href="https://github.com/PeterGuntermann/minesweeper"
                            target="blank"
                        >
                            Source code on GitHub
                        </a>
                    </section>
                    <section className="center">
                        <h1>Minesweeper</h1>
                    </section>
                    <section className="right">
                        <a href="https://reactjs.org/" target="blank">
                            Made with React.JS
                        </a>
                    </section>
                </header>

                <Minesweeper />
            </div>
        </>
    );
}

export default App;
