import { Board } from '../board.class';

describe('Board', () => {
    test('should initialize the positions of the fields correctly', () => {
        const board = new Board(2, 2);

        expect(board.numberOfFields).toBe(4);

        const fields = board.allFields;
        expect(fields).toHaveLength(board.numberOfFields);

        expect(fields[0].position.x).toEqual(0);
        expect(fields[0].position.y).toEqual(0);

        expect(fields[1].position.x).toEqual(1);
        expect(fields[1].position.y).toEqual(0);

        expect(fields[2].position.x).toEqual(0);
        expect(fields[2].position.y).toEqual(1);

        expect(fields[3].position.x).toEqual(1);
        expect(fields[3].position.y).toEqual(1);
    });

    test('should roll mine positions that are all different', () => {
        const numberOfColumns = 3;
        const numberOfRows = 2;
        const numberOfMines = 4;

        const board = new Board(numberOfColumns, numberOfRows, numberOfMines);

        const minePositions = board.allMinePositions;
        expect(minePositions).toHaveLength(numberOfMines);
        expect(minePositions.every((pos) => pos.x < numberOfColumns)).toBe(
            true
        );
        expect(minePositions.every((pos) => pos.y < numberOfRows)).toBe(true);

        for (let i = 0; i < board.numberOfMines; i++) {
            for (let j = 0; j < board.numberOfMines; j++) {
                if (i === j) continue;
                const minePositionsAreIdentical =
                    minePositions[i].x === minePositions[j].x &&
                    minePositions[i].y === minePositions[j].y;
                expect(minePositionsAreIdentical).toBe(false);
            }
        }
    });

    test('should distribute the mines over the corresponding fields', () => {
        const numberOfColumns = 3;
        const numberOfRows = 2;
        const numberOfMines = 4;

        const board = new Board(numberOfColumns, numberOfRows, numberOfMines);
    });
});
