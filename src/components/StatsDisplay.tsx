import * as React from 'react';
import { Board } from './board.class';
import { Badge } from 'react-bootstrap';

interface StatsDisplayProps {
    board: Board;
}

export class StatsDisplay extends React.Component<StatsDisplayProps, any> {
    render() {
        const { board } = this.props;
        return (
            <>
                <div className="smiley">
                    <span role="img" aria-label="smiley">
                        {' '}
                        🤔😎😵
                    </span>
                </div>
                <div className="stats-display">
                    <Badge className="stat mr-3" variant="danger">
                        <span role="img" aria-label="mine">
                            💣
                        </span>
                        &nbsp;<span>{board.numberOfMinesLeft}</span>
                    </Badge>
                    <Badge className="stat mr-3" variant="secondary">
                        <span role="img" aria-label="finger">
                            👆
                        </span>
                        &nbsp;<span>{board.numberOfFieldsToReveal}</span>
                    </Badge>
                    <Badge className="stat" variant="secondary">
                        <span role="img" aria-label="flag">
                            🚩
                        </span>
                        &nbsp;<span>{board.numberOfFlags}</span>
                    </Badge>
                </div>
            </>
        );
    }
}
