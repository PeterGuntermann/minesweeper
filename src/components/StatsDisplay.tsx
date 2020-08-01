import * as React from 'react';
import { Board } from './board.class';

interface StatsDisplayProps {
    board: Board;
}

export class StatsDisplay extends React.Component<StatsDisplayProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="stats-display">
                Fields to reveal: {this.props.board.numberOfFieldsToReveal}
            </div>
        );
    }
}
