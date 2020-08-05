import * as React from 'react';
import '../styles/minesweeper.scss';
import { FieldModel } from '../types/field.interface';
import { GameStatus } from '../types/game-status.enum';
import { Level } from '../types/level.enum';
import { Board } from './board.class';
import { Field } from './fields/Field';
import { LevelChooser } from './LevelChooser';
import { StatsDisplay } from './StatsDisplay';

export interface MinesweeperState {
    level: Level;
    board: Board;
    gameStatus: GameStatus;
    startedAtTime?: number;
    stoppedAtTime?: number;
}

export class Minesweeper extends React.Component<any, MinesweeperState> {
    constructor(props: any) {
        super(props);
        this.state = {
            level: Level.Easy,
            board: new Board(0, 0, 0),
            gameStatus: GameStatus.Idle,
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
            startedAtTime: Date.now(),
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

    handleMultiReveal = (field: FieldModel) => {
        const neighbors = this.state.board.getNeighborsOfField(field);
        const numberOfFlaggedNeighbors = neighbors.filter(
            (neighbor) => neighbor.isFlagged
        ).length;

        if (field.numberOfMineNeighbors === numberOfFlaggedNeighbors) {
            neighbors
                .filter((neighbor) => !neighbor.isFlagged && !neighbor.isRevealed)
                .forEach((neighbor) => this.revealFieldsRecursively(neighbor));
            this.rerenderBoard();
        }
    };

    revealFieldsRecursively = (field: FieldModel): void => {
        if (field.isRevealed) return;

        const { board } = this.state;
        board.revealField(field);

        if (field.numberOfMineNeighbors === 0) {
            const neighbors = board.getNeighborsOfField(field);
            neighbors.forEach((neighbor) => {
                this.revealFieldsRecursively(neighbor);
            });
        }
    };

    handleFlag = (field: FieldModel): void => {
        this.state.board.toggleFlagForField(field);
        this.rerenderBoard();
    };

    board = (): JSX.Element => {
        const boardCssClasses = `board level-${this.state.level} game-status-${this.state.gameStatus}`;
        return (
            <div className={boardCssClasses}>
                {this.state.board.allFields.map((field: FieldModel, index: number) => (
                    <Field
                        key={index}
                        field={field}
                        onReveal={(field: FieldModel) => this.handleReveal(field)}
                        onMultiReveal={(field: FieldModel) =>
                            this.handleMultiReveal(field)
                        }
                        onFlag={(field: FieldModel) => this.handleFlag(field)}
                    />
                ))}
            </div>
        );
    };

    howToUse = (): JSX.Element => (
        <div className="how-to-use">
            Left-click on a field to reveal it. <br />
            Right-click to set a flag.
            <br />
            Double-click on a revealed field to multi-reveal all neighbors (if flags are
            set).
        </div>
    );

    render = (): JSX.Element => (
        <section className="minesweeper">
            <LevelChooser onStartNewGameClick={this.startNewGame} />
            <StatsDisplay minesweeperState={this.state} />
            {this.board()}
            {this.howToUse()}
        </section>
    );

    private rerenderBoard = () => this.setState({});
}
