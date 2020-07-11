import * as React from 'react';
import '../styles/minesweeper.scss';
import { MineField } from './MineField';
import { RevealedField } from './RevealedField';
import { UntouchedField } from './UntouchedField';
import { FieldModel } from '../types/field.interface';

interface FieldProps {
    fieldModel: FieldModel;
}

interface FieldState {
    isRevealed: boolean;
}

export class Field extends React.Component<FieldProps, FieldState> {
    state = {
        isRevealed: true, // set this to false for production
    };

    handleReveal = () => {
        this.setState({ isRevealed: true });
    };

    render() {
        const { isRevealed } = this.state;
        const { fieldModel } = this.props;

        if (isRevealed) {
            return fieldModel.hasMine ? (
                <MineField />
            ) : (
                <RevealedField
                    neighborCount={fieldModel.numberOfMineNeighbors}
                />
            );
        }

        return <UntouchedField onReveal={this.handleReveal} />;
    }
}
