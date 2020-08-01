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
}

export class Field extends React.Component<FieldProps, any> {
    handleReveal = () => {
        if (!this.props.field.isRevealed) this.props.onReveal(this.props.field);
    };

    handleFlag = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();
        if (!this.props.field.isRevealed) this.props.onFlag(this.props.field);
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
        >
            {this.field()}
        </div>
    );
}
