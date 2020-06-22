import * as React from "react";
import "./minesweeper.css";
import "./board.css";
import { Field } from "./Field";

export class Minesweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: "easy", // easy, medium, hard
            numberOfMines: 10,
            numberOfRows: 9,
            numberOfColumns: 9,
            status: "playing", // playing, clear, gameover
            fields: Array(16).fill(Array(30).fill(1))
        };
    }

    fieldRow = (fieldsInThisRow) => {
        return fieldsInThisRow.map(field => <Field neighborCount={1} hasMine={!!field}/>);
    };

    board = () => {
        const boardCssClasses = `board level-${this.state.level}`;
        return <div className={boardCssClasses}>
            {this.state.fields.map(row => this.fieldRow(row))}
        </div>;
    };

    render() {
        return (<div className="minesweeper">
            <p className="info">
                <span>Level: {this.state.level}, </span>
                <span>Mines: {this.state.numberOfMines}, </span>
                <span>Status: {this.state.status}</span>
            </p>
            {this.board()}
        </div>);
    }
}

