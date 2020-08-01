import * as React from 'react';
import '../styles/minesweeper.scss';
import { FieldModel } from '../types/field.interface';
import { Level } from '../types/level.enum';
import { Board } from './board.class';
import { LevelChooser } from './LevelChooser';
import { Field } from './fields/Field';
import { StatsDisplay } from './StatsDisplay';
import { GameStatus } from '../types/game-status.enum';
import { Alert } from 'react-bootstrap';

interface MinesweeperProps {}

interface MinesweeperState {
    level: Level;
    board: Board;
    gameStatus: GameStatus;
}

export class Minesweeper extends React.Component<MinesweeperProps, MinesweeperState> {
    constructor(props: any) {
        super(props);
        this.state = {
            level: Level.Easy,
            board: new Board(9, 9, 10),
            gameStatus: GameStatus.Playing,
        };
    }

    startNewGame = (level: Level) => {
        switch (level) {
            case Level.Easy:
                this.setState({
                    board: new Board(9, 9, 10),
                });
                break;
            case Level.Medium:
                this.setState({
                    board: new Board(16, 16, 40),
                });
                break;
            case Level.Hard:
                this.setState({
                    board: new Board(30, 16, 100),
                });
                break;
            default:
                break;
        }
        this.setState({
            level: level,
            gameStatus: GameStatus.Playing,
        });
    };

    handleReveal = (field: FieldModel) => {
        const { board } = this.state;

        if (field.hasMine) {
            board.revealAllFields();
            this.setState({ gameStatus: GameStatus.Lost });
        } else {
            this.revealFieldsRecursively(field);
        }

        if (board.numberOfFieldsToReveal === 0) {
            board.revealAllFields();
            this.setState({ gameStatus: GameStatus.Won });
        }
        this.rerenderBoard();
    };

    revealFieldsRecursively(field: FieldModel): void {
        if (field.isRevealed) return;

        const { board } = this.state;
        board.revealField(field);

        if (field.numberOfMineNeighbors === 0) {
            const neighbors = board.getNeighborsOfField(field);
            neighbors.forEach((neighbor) => {
                this.revealFieldsRecursively(neighbor);
            });
        }
    }

    handleFlag = (field: FieldModel) => {
        this.state.board.toggleFlagForField(field);
        this.rerenderBoard();
    };

    board = () => {
        const boardCssClasses = `board level-${this.state.level} game-status-${this.state.gameStatus}`;
        return (
            <div className={boardCssClasses}>
                {this.state.board.allFields.map((field: FieldModel, index: number) => (
                    <Field
                        key={index}
                        field={field}
                        onReveal={(field: FieldModel) => this.handleReveal(field)}
                        onFlag={(field: FieldModel) => this.handleFlag(field)}
                    />
                ))}
            </div>
        );
    };

    winMessage = () => (
        <div className="win-message">
            <span role="img" aria-label="party">
                🎊🎉
            </span>
            &nbsp;
            <span>Congratulations, you made it!</span>
            &nbsp;
            <span role="img" aria-label="party">
                🎉🎊
            </span>
        </div>
    );

    loseMessage = () => (
        <div className="lose-message">
            <span role="img" aria-label="party">
                🔥💥
            </span>
            &nbsp;
            <span>Whoops - try again!</span>
            &nbsp;
            <span role="img" aria-label="party">
                💥🔥
            </span>
        </div>
    );

    render() {
        const randomlyCreatedKeyToResetTheStatesOfAllFields = Math.random();
        const { gameStatus, board } = this.state;

        return (
            <section
                className="minesweeper"
                key={randomlyCreatedKeyToResetTheStatesOfAllFields}
            >
                <LevelChooser onStartNewGameClick={this.startNewGame} />
                <StatsDisplay board={board} gameStatus={gameStatus} />
                {this.board()}
                {gameStatus === GameStatus.Won && this.winMessage()}
                {gameStatus === GameStatus.Lost && this.loseMessage()}
            </section>
        );
    }

    private rerenderBoard() {
        this.setState({});
    }
}
