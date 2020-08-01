import * as React from 'react';
import '../../styles/minesweeper.scss';
import { FieldModel } from '../../types/field.interface';
import { NumberField } from './NumberField';
import { UntouchedField } from './UntouchedField';
import { MineField } from './MineField';
import { FlagField } from './FlagField';

interface FieldProps {
    fieldModel: FieldModel;
    onReveal: any;
    onFlag: any;
}

export class Field extends React.Component<FieldProps, any> {
    handleReveal = () => {
        this.props.onReveal(this.props.fieldModel);
    };

    handleFlag = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();
        this.props.onFlag(this.props.fieldModel);
        console.log('Right clicked!');
    };

    revealedField = () =>
        this.props.fieldModel.hasMine ? (
            <MineField />
        ) : (
            <NumberField neighborCount={this.props.fieldModel.numberOfMineNeighbors} />
        );

    unrevealedField = () =>
        this.props.fieldModel.isFlagged ? <FlagField /> : <UntouchedField />;

    field = () =>
        this.props.fieldModel.isRevealed ? this.revealedField() : this.unrevealedField();

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
