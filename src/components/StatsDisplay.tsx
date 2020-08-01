import * as React from 'react';
import { Board } from './board.class';
import { Badge } from 'react-bootstrap';
import { GameStatus } from '../types/game-status.enum';

interface StatsDisplayProps {
    board: Board;
    gameStatus: GameStatus;
}

export class StatsDisplay extends React.Component<StatsDisplayProps, any> {
    smiley = () => {
        switch (this.props.gameStatus) {
            case GameStatus.Playing:
                return '🤔';
            case GameStatus.Won:
                return '😎';
            case GameStatus.Lost:
                return '😵';
        }
    };
    render() {
        const { board, gameStatus } = this.props;
        return (
            <>
                <div className="smiley">
                    <span role="img" aria-label="smiley">
                        {this.smiley()}
                    </span>
                </div>
                <div className="stats-display">
                    <Badge className="stat mr-3" variant="danger">
                        <span role="img" aria-label="mine">
                            💣
                        </span>
                        &nbsp;
                        <span>
                            {gameStatus === GameStatus.Won ? 0 : board.numberOfMinesLeft}
                        </span>
                    </Badge>
                    <Badge className="stat mr-3" variant="secondary">
                        <span role="img" aria-label="finger">
                            👆
                        </span>
                        &nbsp;
                        <span>
                            {gameStatus === GameStatus.Playing
                                ? board.numberOfFieldsToReveal
                                : 0}
                        </span>
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
