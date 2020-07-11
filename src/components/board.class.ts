import { FieldModel } from '../types/field.interface';
import { Position } from '../types/position.interface';

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

    private initializeBlankFields() {
        for (let i = 0; i < this.numberOfFields; i++) {
            this.fields.push(<FieldModel>{
                hasMine: false,
                isRevealed: true,
                position: {
                    x: i % this.numberOfColumns,
                    y: Math.floor(i / this.numberOfColumns),
                },
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
            const field =
                this.allFields.find(
                    (f) =>
                        f.position.x === minePosition.x &&
                        f.position.y === minePosition.y
                ) ?? <FieldModel>{};
            field.hasMine = true;
        });
    }
}
