import * as React from 'react';
import '../styles/minesweeper.scss';
import { Level } from '../types/level.enum';
import { Field } from './Field';
import { FieldModel } from '../types/field.interface';
import { Board } from './board.class';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';

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

    handleChangeLevel = (event: any) => {
        this.setState({ level: event.target.value });
        this.startNewGame(event.target.value);
    };

    // TODO: Invoke action via button instead of selection change
    levelChooser = () => {
        const radioOptions = [
            { name: 'Easy', value: '1' },
            { name: 'Normal', value: '2' },
            { name: 'Hard', value: '3' },
        ];
        return (
            <div className="choose-level">
                <Button variant="primary">Primary</Button> <label>Level: </label>
                <ButtonGroup toggle>
                    {radioOptions.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={idx === 1}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                <select value={this.state.level} onChange={this.handleChangeLevel}>
                    <option value="">-- Choose difficulty --</option>
                    <option value="easy">Easy: 9x9 board, 10 mines (12%)</option>
                    <option value="medium">Medium: 16x16 board, 40 mines (16%)</option>
                    <option value="hard">Hard: 30x16 board, 100 mines (21%)</option>
                </select>
            </div>
        );
    };

    render() {
        return (
            <div className="minesweeper">
                {this.levelChooser()}
                {this.board()}
            </div>
        );
    }
}
