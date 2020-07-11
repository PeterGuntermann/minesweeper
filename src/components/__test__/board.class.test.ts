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
        const numberOfColumns = 9;
        const numberOfRows = 9;
        const numberOfMines = 10;

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
        const numberOfColumns = 9;
        const numberOfRows = 9;
        const numberOfMines = 10;

        const board = new Board(numberOfColumns, numberOfRows, numberOfMines);

        const mineFields = board.allFields.filter((f) => f.hasMine);
        const nonMineFields = board.allFields.filter((f) => !f.hasMine);
        expect(mineFields).toHaveLength(numberOfMines);
        expect(nonMineFields).toHaveLength(
            board.numberOfFields - numberOfMines
        );
    });

    test('should calculate the number of mine neighbors for each field', () => {
        const numberOfColumns = 2;
        const numberOfRows = 2;
        const numberOfMines = 3;

        const board = new Board(numberOfColumns, numberOfRows, numberOfMines);

        // How could I test this as there is randomness involved?
        // console.log(board.allFields.map((f) => f.numberOfMineNeighbors));
    });
});
