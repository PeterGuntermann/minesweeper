import { FieldModel } from '../types/field.interface';

export class Board {
    private fields: FieldModel[];

    constructor(
        public readonly numberOfRows: number,
        public readonly numberOfColumns: number
    ) {
        this.fields = [];
        this.initializeFields();
    }

    get numberOfFields(): number {
        return this.numberOfRows * this.numberOfColumns;
    }

    get allFields(): FieldModel[] {
        return this.fields;
    }

    private initializeFields() {
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
}
