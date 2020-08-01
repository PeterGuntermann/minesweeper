import * as React from 'react';
import '../styles/minesweeper.scss';
import { FieldModel } from '../types/field.interface';
import { Level } from '../types/level.enum';
import { Board } from './board.class';
import { Field } from './Field';
import { LevelChooser } from './LevelChooser';

interface MinesweeperProps {}

interface MinesweeperState {
    level: Level;
    board: Board;
}

export class Minesweeper extends React.Component<MinesweeperProps, MinesweeperState> {
    constructor(props: any) {
        super(props);
        this.state = {
            level: Level.Easy,
            board: new Board(9, 9, 10),
        };
    }

    startNewGame = (level: Level) => {
        switch (level) {
            case Level.Easy:
                this.setState({ board: new Board(9, 9, 10) });
                break;
            case Level.Medium:
                this.setState({ board: new Board(16, 16, 40) });
                break;
            case Level.Hard:
                this.setState({ board: new Board(30, 16, 100) });
                break;
            default:
                break;
        }
        this.setState({ level: level });
    };

    handleReveal = (field: FieldModel) => {
        const { board } = this.state;

        if (field.hasMine) {
            board.revealAllFields();
            console.log('You lose!');
        } else {
            this.revealFieldsRecursively(field);
        }

        if (board.numberOfFieldsToReveal === 0) {
            board.revealAllFields();
            console.log('You win!');
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

    board = () => {
        const boardCssClasses = `board level-${this.state.level}`;
        return (
            <div className={boardCssClasses}>
                {this.state.board.allFields.map((field: FieldModel, index: number) => (
                    <Field
                        key={index}
                        fieldModel={field}
                        onReveal={(field: FieldModel) => this.handleReveal(field)}
                    />
                ))}
            </div>
        );
    };

    render() {
        const randomlyCreatedKeyToResetTheStatesOfAllFields = Math.random();

        return (
            <section
                className="minesweeper"
                key={randomlyCreatedKeyToResetTheStatesOfAllFields}
            >
                <LevelChooser onStartNewGameClick={this.startNewGame} />
                <div>Fields to reveal: {this.state.board.numberOfFieldsToReveal}</div>

                {this.board()}
            </section>
        );
    }

    private rerenderBoard() {
        this.setState({});
    }
}
