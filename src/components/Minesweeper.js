import * as React from "react";
import { FieldContainer } from "./FieldContainer";

export class Minesweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div className="board">
            <FieldContainer neighborCount={0}/>
            <FieldContainer neighborCount={1}/>
            <FieldContainer neighborCount={2}/>
            <FieldContainer neighborCount={3}/>
            <FieldContainer neighborCount={4}/>
            <FieldContainer neighborCount={5}/>
            <FieldContainer neighborCount={6}/>
            <FieldContainer neighborCount={7}/>
            <FieldContainer neighborCount={8}/>
        </div>);
    }
}

