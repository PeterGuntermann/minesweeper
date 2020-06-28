import * as React from "react";
import "../styles/board.css";
import "../styles/minesweeper.css";
import { Field } from "./Field";

export class Minesweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: "easy", // easy, medium, hard
            numberOfRows: 9,
            numberOfColumns: 9,
            numberOfMines: 10,
            status: "playing", // playing, clear, gameover
            fields: Array(9).fill(Array(9).fill(1)),
        };
    }

    createNewBoard = (numberOfRows, numberOfColumns, numberOfMines) => {
        let fields = Array(numberOfRows).fill(Array(numberOfColumns).fill(0));
        let minePositions = new Set();

        while (minePositions.size < numberOfMines) {
            const randomRow = Math.floor((Math.random() * numberOfRows));
            const randomColumn = Math.floor((Math.random() * numberOfRows));
            minePositions.add({
                row: randomRow,
                column: randomColumn,
            });
        }

        minePositions.forEach(mine => {
            fields[mine.row][mine.column] = 1;
        });
        console.log(minePositions);
        return fields;
    };

    startNewGame = (level) => {
        switch (level) {
            case "easy":
                this.setState({
                    numberOfRows: 9,
                    numberOfColumns: 9,
                    numberOfMines: 10,
                    fields: this.createNewBoard(9, 9, 10),
                });
                break;
            case "medium":
                this.setState({
                    numberOfRows: 16,
                    numberOfColumns: 16,
                    numberOfMines: 40,
                    fields: this.createNewBoard(16, 16, 40),
                });
                break;
            case "hard":
                this.setState({
                    numberOfRows: 16,
                    numberOfColumns: 30,
                    numberOfMines: 100,
                    fields: this.createNewBoard(16, 30, 100),
                });
                break;
            default:
                break;
        }
        console.log(this.state);
    };

    fieldRow = fieldsInThisRow => {
        return fieldsInThisRow.map((field, index) => <Field key={index} neighborCount={1} hasMine={!!field}/>);
    };

    board = () => {
        const boardCssClasses = `board level-${this.state.level}`;
        return <div className={boardCssClasses}>
            {this.state.fields.map(row => this.fieldRow(row))}
        </div>;
    };

    handleChangeLevel = (event) => {
        this.setState({ level: event.target.value });
        this.startNewGame(event.target.value);
    };

    levelChooser = () => (
        <div className="choose-level">
            <label>Level: </label>
            <select value={this.state.level} onChange={this.handleChangeLevel}>
                <option value="">-- Choose difficulty --</option>
                <option value="easy">Easy: 9x9 board, 10 mines (12%)</option>
                <option value="medium">Medium: 16x16 board, 40 mines (16%)</option>
                <option value="hard">Hard: 30x16 board, 100 mines (21%)</option>
            </select>
        </div>
    );

    render() {
        return (<div className="minesweeper">
                {this.levelChooser()}
                {this.board()}
            </div>
        );
    }
}

