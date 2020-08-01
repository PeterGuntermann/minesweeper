import * as React from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Level } from '../types/level.enum';

interface LevelChooserProps {
    onStartNewGameClick: (level: Level) => void;
}

interface LevelChooserState {
    currentlySelectedLevel: Level;
}

interface LevelRadioOption {
    name: string;
    value: Level;
}

export class LevelChooser extends React.Component<LevelChooserProps, LevelChooserState> {
    readonly radioOptions: LevelRadioOption[] = [
        { name: 'Easy', value: Level.Easy },
        { name: 'Medium', value: Level.Medium },
        { name: 'Hard', value: Level.Hard },
    ];

    constructor(props: any) {
        super(props);
        this.state = {
            currentlySelectedLevel: Level.Easy,
        };
    }

    handleChangeSelection = (event: any) => {
        this.setState({ currentlySelectedLevel: event.target.value });
    };

    render() {
        return (
            <div className="level-chooser">
                <ButtonGroup toggle>
                    {this.radioOptions.map((radio: LevelRadioOption, idx) => (
                        <ToggleButton
                            key={idx}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={radio.value === this.state.currentlySelectedLevel}
                            onFocus={this.handleChangeSelection}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>

                <Button
                    variant="primary"
                    onClick={() =>
                        this.props.onStartNewGameClick(this.state.currentlySelectedLevel)
                    }
                >
                    Start new game!
                </Button>
            </div>
        );
    }
}
