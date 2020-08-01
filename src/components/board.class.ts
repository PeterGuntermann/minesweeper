import { FieldModel } from '../types/field.interface';
import { Position } from '../types/position.interface';

export class Board {
    private readonly fields: FieldModel[];
    private readonly minePositions: Position[];

    private numberOfRevealedFields = 0;

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

    get numberOfFieldsToReveal(): number {
        return this.numberOfFields - this.numberOfMines - this.numberOfRevealedFields;
    }

    get allFields(): FieldModel[] {
        return this.fields;
    }

    get allMinePositions(): Position[] {
        return this.minePositions;
    }

    revealField(field: FieldModel): void {
        const boardField = this.getFieldByPosition(field.position);
        if (boardField) boardField.isRevealed = true;
        this.numberOfRevealedFields++;
    }

    revealAllFields(): void {
        this.fields.forEach((field) => {
            this.revealField(field);
        });
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
            (field) => field.position.x === position.x && field.position.y === position.y
        );
    }

    getNeighborsOfField(field: FieldModel): FieldModel[] {
        const centerX = field.position.x;
        const centerY = field.position.y;
        const centerIsNotAtTopBoundary = centerY - 1 >= 0;
        const centerIsNotAtLeftBoundary = centerX - 1 >= 0;
        const centerIsNotAtRightBoundary = centerX + 1 < this.numberOfColumns;
        const centerIsNotAtBottomBoundary = centerY - 1 < this.numberOfRows;

        return this.fields.filter((potentialNeighborField) => {
            const x = potentialNeighborField.position.x;
            const y = potentialNeighborField.position.y;
            let isTopLeft = false;
            let isTop = false;
            let isTopRight = false;
            let isLeft = false;
            let isRight = false;
            let isBottomLeft = false;
            let isBottom = false;
            let isBottomRight = false;

            if (centerIsNotAtTopBoundary && centerIsNotAtLeftBoundary) {
                isTopLeft = x === centerX - 1 && y === centerY - 1;
            }
            if (centerIsNotAtTopBoundary) {
                isTop = x === centerX && y === centerY - 1;
            }
            if (centerIsNotAtTopBoundary && centerIsNotAtRightBoundary) {
                isTopRight = x === centerX + 1 && y === centerY - 1;
            }
            if (centerIsNotAtLeftBoundary) {
                isLeft = x === centerX - 1 && y === centerY;
            }
            if (centerIsNotAtRightBoundary) {
                isRight = x === centerX + 1 && y === centerY;
            }
            if (centerIsNotAtBottomBoundary && centerIsNotAtLeftBoundary) {
                isBottomLeft = x === centerX - 1 && y === centerY + 1;
            }
            if (centerIsNotAtBottomBoundary) {
                isBottom = x === centerX && y === centerY + 1;
            }
            if (centerIsNotAtBottomBoundary && centerIsNotAtRightBoundary) {
                isBottomRight = x === centerX + 1 && y === centerY + 1;
            }

            return (
                isTopLeft ||
                isTop ||
                isTopRight ||
                isLeft ||
                isRight ||
                isBottomLeft ||
                isBottom ||
                isBottomRight
            );
        });
    }

    private initializeBlankFields() {
        for (let i = 0; i < this.numberOfFields; i++) {
            this.fields.push({
                hasMine: false,
                isRevealed: false,
                position: {
                    x: i % this.numberOfColumns,
                    y: Math.floor(i / this.numberOfColumns),
                },
                numberOfMineNeighbors: 0,
            } as FieldModel);
        }
    }

    private rollMinePositions() {
        while (this.minePositions.length < this.numberOfMines) {
            const randomColumn = Math.floor(Math.random() * this.numberOfColumns);
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

    private calculateNumberOfMineNeighbors() {
        this.fields.forEach((field) => {
            field.numberOfMineNeighbors = this.getNumberOfMineNeighborsForField(field);
        });
    }

    private getNumberOfMineNeighborsForField(field: FieldModel) {
        const neighbors = this.getNeighborsOfField(field);
        const neighborsWithMine = neighbors.filter((neighbor) => neighbor.hasMine);
        return neighborsWithMine.length;
    }
}
