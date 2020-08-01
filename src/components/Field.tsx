import * as React from 'react';
import '../styles/minesweeper.scss';
import { FieldModel } from '../types/field.interface';
import { MineField } from './MineField';
import { RevealedField } from './RevealedField';
import { UntouchedField } from './UntouchedField';

interface FieldProps {
    fieldModel: FieldModel;
    onMineReveal: any;
}

interface FieldState {
    isRevealed: boolean;
}

export class Field extends React.Component<FieldProps, FieldState> {
    state = {
        isRevealed: false,
    };

    handleReveal = () => {
        this.setState({ isRevealed: true });
        if (this.props.fieldModel.hasMine) this.props.onMineReveal();
    };

    render() {
        const { isRevealed } = this.state;
        const { fieldModel } = this.props;

        if (isRevealed) {
            return fieldModel.hasMine ? (
                <MineField />
            ) : (
                <RevealedField neighborCount={fieldModel.numberOfMineNeighbors} />
            );
        }

        return <UntouchedField onReveal={this.handleReveal} />;
    }
}
