import * as React from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import '../styles/minesweeper.scss';
import { FieldModel } from '../types/field.interface';
import { Level } from '../types/level.enum';
import { Board } from './board.class';
import { Field } from './Field';

interface MinesweeperProps {}

interface MinesweeperState {
    currentGameLevel: Level;
    nextGameLevel: Level;
    board: Board;
}

export class Minesweeper extends React.Component<MinesweeperProps, MinesweeperState> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentGameLevel: Level.Easy,
            nextGameLevel: Level.Easy,
            board: new Board(9, 9, 10),
        };
    }

    startNewGame = () => {
        const level = this.state.nextGameLevel;
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
        this.setState({ currentGameLevel: level });
    };

    // TODO: Implement reveal mechanics (win/lose)
    board = () => {
        const boardCssClasses = `board level-${this.state.currentGameLevel}`;
        return (
            <div className={boardCssClasses}>
                {this.state.board.allFields.map((field: FieldModel, index: number) => (
                    <Field key={index} fieldModel={field} />
                ))}
            </div>
        );
    };

    handleChangeLevel = (event: any) => {
        console.log(event.target.value);
        this.setState({ nextGameLevel: event.target.value });
    };

    levelChooser = () => {
        const radioOptions = [
            { name: 'Easy', value: Level.Easy },
            { name: 'Medium', value: Level.Medium },
            { name: 'Hard', value: Level.Hard },
        ];
        return (
            <div className="choose-level">
                <ButtonGroup toggle>
                    {radioOptions.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={radio.value === this.state.currentGameLevel}
                            onChange={this.handleChangeLevel}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>

                <Button variant="primary" onClick={this.startNewGame}>
                    Start new game!
                </Button>
            </div>
        );
    };

    render() {
        return (
            <section className="minesweeper">
                {this.levelChooser()}
                {this.board()}
            </section>
        );
    }
}
