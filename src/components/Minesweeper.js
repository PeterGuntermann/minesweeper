import * as React from "react";
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
            fields: [
                [1, 1, 0],
                [0, 0, 1],
                [0, 1, 0],
            ],
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
                <span>Level: {this.state.level}</span><br/>
                <span>Mines: {this.state.numberOfMines}</span><br/>
                <span>Status: {this.state.status}</span>
            </p>
            {this.board()}
        </div>);
    }
}

