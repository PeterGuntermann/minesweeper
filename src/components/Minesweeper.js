import * as React from "react";
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
        };
    }

    render() {
        return (<div className="board">
            <Field neighborCount={0} hasMine={true}/>
            <Field neighborCount={1}/>
            <Field neighborCount={2}/>
            <Field neighborCount={3}/>
            <Field neighborCount={4}/>
            <Field neighborCount={5}/>
            <Field neighborCount={6}/>
            <Field neighborCount={7}/>
            <Field neighborCount={8}/>
        </div>);
    }
}

