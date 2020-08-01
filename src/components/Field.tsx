import * as React from 'react';
import '../styles/minesweeper.scss';
import { FieldModel } from '../types/field.interface';
import { MineField } from './MineField';
import { RevealedField } from './RevealedField';
import { UntouchedField } from './UntouchedField';

interface FieldProps {
    fieldModel: FieldModel;
    onReveal: any;
}

interface FieldState {
    isRevealed: boolean;
}

export class Field extends React.Component<FieldProps, FieldState> {
    handleReveal = () => {
        this.props.onReveal(this.props.fieldModel);
    };

    handleFlag = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();
        console.log('Right clicked!');
    };

    field = () => {
        const { fieldModel } = this.props;

        if (fieldModel.isRevealed) {
            return fieldModel.hasMine ? (
                <MineField />
            ) : (
                <RevealedField neighborCount={fieldModel.numberOfMineNeighbors} />
            );
        }

        return <UntouchedField />;
    };

    render = () => (
        <div
            className="field"
            onClick={this.handleReveal}
            onContextMenu={this.handleFlag}
        >
            {this.field()}
        </div>
    );
}
