import * as React from 'react';
import '../../styles/minesweeper.scss';
import { FieldModel } from '../../types/field.interface';
import { NumberField } from './NumberField';
import { UntouchedField } from './UntouchedField';
import { MineField } from './MineField';
import { FlagField } from './FlagField';

interface FieldProps {
    field: FieldModel;
    onReveal: any;
    onFlag: any;
    onMultiReveal: any;
}

export class Field extends React.Component<FieldProps, any> {
    handleReveal = () => {
        const { field, onReveal } = this.props;
        if (!field.isRevealed && !field.isFlagged) onReveal(field);
    };

    handleMultiReveal = () => {
        const { field, onMultiReveal } = this.props;
        if (field.isRevealed) onMultiReveal(field);
    };

    handleFlag = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();
        const { field, onFlag } = this.props;
        if (!field.isRevealed) onFlag(field);
    };

    revealedField = () =>
        this.props.field.hasMine ? (
            <MineField />
        ) : (
            <NumberField neighborCount={this.props.field.numberOfMineNeighbors} />
        );

    unrevealedField = () =>
        this.props.field.isFlagged ? <FlagField /> : <UntouchedField />;

    field = () =>
        this.props.field.isRevealed ? this.revealedField() : this.unrevealedField();

    render = () => (
        <div
            className="field"
            onClick={this.handleReveal}
            onContextMenu={this.handleFlag}
            onDoubleClick={this.handleMultiReveal}
        >
            {this.field()}
        </div>
    );
}
