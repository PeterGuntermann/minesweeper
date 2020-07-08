import * as React from "react";
import "../styles/minesweeper.scss";
import { Field } from "./Field";
import { Position } from "../types/position.interface";
import { Level } from "../types/level.enum";
import { FieldModel } from "../types/field.interface";

interface MinesweeperProps {
}

interface MinesweeperState {
    level: Level,
    numberOfRows: number,
    numberOfColumns: number,
    numberOfMines: number,
    fields: FieldModel[][]
}

export class Minesweeper extends React.Component<MinesweeperProps, MinesweeperState> {
    constructor(props: any) {
        super(props);
        this.state = {
            level: Level.Easy,
            numberOfRows: 9,
            numberOfColumns: 9,
            numberOfMines: 10,
            fields: Array(9).fill(Array(9).fill(1)),
        };
    }

    createNewBoard = (numberOfRows: number, numberOfColumns: number, numberOfMines: number) => {
        let fields: FieldModel[][] = Array<FieldModel[]>(numberOfRows).fill(Array<FieldModel>(numberOfColumns).fill({
            hasMine: false,
            isRevealed: true
        }));
        let minePositions: Array<Position> = new Array<Position>();

        while (minePositions.length < numberOfMines) {
            const randomRow = Math.floor((Math.random() * numberOfRows));
            const randomColumn = Math.floor((Math.random() * numberOfRows));
            const position: Position = {
                row: randomRow,
                column: randomColumn
            }
            minePositions.push(position);
        }

        fields.forEach((fieldRow, rowIndex) => {
            fieldRow.forEach((field, colIndex) => {
                const isMinePosition = minePositions.some((minePosition) => minePosition.column === colIndex && minePosition.row === rowIndex)
                console.log("rowIndex: " + rowIndex);
                console.log("colIndex: " + colIndex);
                console.log("isMinePosition: " + isMinePosition);
                field.hasMine = isMinePosition;
            })
        })
        minePositions.forEach((mine) => {
            console.log("col: " + mine.column + ", row: " + mine.row);
            // fields[mine.row][mine.column].hasMine = true;
        });
        console.log(minePositions);
        console.log(fields);
        return fields;
    }
    ;

    startNewGame = (level: Level) => {
        switch (level) {
            case Level.Easy:
                this.setState({
                    numberOfRows: 9,
                    numberOfColumns: 9,
                    numberOfMines: 10,
                    fields: this.createNewBoard(9, 9, 10),
                });
                break;
            case Level.Medium:
                this.setState({
                    numberOfRows: 16,
                    numberOfColumns: 16,
                    numberOfMines: 40,
                    fields: this.createNewBoard(16, 16, 40),
                });
                break;
            case Level.Hard:
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

    fieldRow = (fieldsInThisRow: any) => {
        return fieldsInThisRow.map((field: any, index: number) => (
            <Field key={index}
                   neighborCount={1}
                   fieldModel={field}/>));
    };

    board = () => {
        const boardCssClasses = `board level-${this.state.level}`;
        return <div className={boardCssClasses}>
            {this.state.fields.map(row => this.fieldRow(row))}
        </div>;
    };

    handleChangeLevel = (event: any) => {
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
