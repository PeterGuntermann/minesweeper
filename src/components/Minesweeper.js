import * as React from "react";

export class Minesweeper extends React.Component {
    constructor() {
        super();
    }

    renderField = () => (<strong>field</strong>);


    render() {
        return (
            <>
                <p>Yo!</p>
                <div>
                    {this.renderField()}
                </div>
            </>
        );
    }
}
