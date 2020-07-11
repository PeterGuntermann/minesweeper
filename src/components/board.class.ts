import { FieldModel } from '../types/field.interface';
import { Position } from '../types/position.interface';
import ts from 'typescript/lib/tsserverlibrary';

export class Board {
    private fields: FieldModel[];
    private minePositions: Position[];

    constructor(
        public readonly numberOfColumns: number,
        public readonly numberOfRows: number,
        public readonly numberOfMines: number = 0
    ) {
        this.fields = [];
        this.minePositions = [];
        this.initializeBlankFields();
        this.rollMinePositions();
        this.distributeMines();
        this.calculateNumberOfMineNeighbors();
    }

    get numberOfFields(): number {
        return this.numberOfRows * this.numberOfColumns;
    }

    get allFields(): FieldModel[] {
        return this.fields;
    }

    get allMinePositions(): Position[] {
        return this.minePositions;
    }

    getFieldByPosition(position: Position): FieldModel | undefined {
        const positionIsInvalid =
            position.x >= this.numberOfColumns ||
            position.x < 0 ||
            position.y >= this.numberOfRows ||
            position.y < 0;

        if (positionIsInvalid) {
            console.warn('Tried to get field by invalid position.', position);
            return undefined;
        }

        return this.fields.find(
            (field) =>
                field.position.x === position.x &&
                field.position.y === position.y
        );
    }

    private initializeBlankFields() {
        for (let i = 0; i < this.numberOfFields; i++) {
            this.fields.push(<FieldModel>{
                hasMine: false,
                isRevealed: true,
                position: {
                    x: i % this.numberOfColumns,
                    y: Math.floor(i / this.numberOfColumns),
                },
                numberOfMineNeighbors: 0,
            });
        }
    }

    private rollMinePositions() {
        while (this.minePositions.length < this.numberOfMines) {
            const randomColumn = Math.floor(Math.random() * this.numberOfRows);
            const randomRow = Math.floor(Math.random() * this.numberOfRows);
            const position: Position = {
                x: randomColumn,
                y: randomRow,
            };
            const positionAlreadyExists = this.minePositions.some(
                (pos) => pos.x === randomColumn && pos.y === randomRow
            );

            if (!positionAlreadyExists) {
                this.minePositions.push(position);
            }
        }
    }

    private distributeMines() {
        this.minePositions.forEach((minePosition) => {
            const field = this.getFieldByPosition(minePosition);

            if (field !== undefined) {
                field.hasMine = true;
            } else {
                console.warn('Tried to set a mine on a undefined field!');
            }
        });
    }

    private calculateNumberOfMineNeighbors() {}
}
