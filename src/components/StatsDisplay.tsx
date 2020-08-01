import * as React from 'react';
import { Board } from './board.class';
import { Badge } from 'react-bootstrap';

interface StatsDisplayProps {
    board: Board;
}

export class StatsDisplay extends React.Component<StatsDisplayProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { board } = this.props;
        return (
            <div className="stats-display">
                <Badge className="stat mr-3" variant="danger">
                    <span role="img" aria-label="mine">
                        💣
                    </span>
                    &nbsp;<span>{board.numberOfMines}</span>
                </Badge>
                <Badge className="stat" variant="secondary">
                    <span role="img" aria-label="check">
                        👆
                    </span>
                    &nbsp;<span>{board.numberOfFieldsToReveal}</span>
                </Badge>
            </div>
        );
    }
}
