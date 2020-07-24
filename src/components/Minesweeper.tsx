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

    // TODO: Implement reveal mechanics (win/lose)
    board = () => {
        const boardCssClasses = `board level-${this.state.level}`;
        return (
            <div className={boardCssClasses}>
                {this.state.board.allFields.map((field: FieldModel, index: number) => (
                    <Field key={index} fieldModel={field} />
                ))}
            </div>
        );
    };

    render() {
        return (
            <section className="minesweeper">
                <LevelChooser onStartNewGameClick={this.startNewGame} />

                {this.board()}
            </section>
        );
    }
}
