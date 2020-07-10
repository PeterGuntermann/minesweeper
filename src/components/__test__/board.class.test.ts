import { Board } from '../board.class';

describe('Board', () => {
    test('should initialize the positions of the fields correctly', () => {
        const board = new Board(2, 2);
        const fields = board.allFields;

        expect(board.numberOfFields).toBe(4);
        expect(fields.length).toEqual(board.numberOfFields);

        expect(fields[0].position.x).toEqual(0);
        expect(fields[0].position.y).toEqual(0);

        expect(fields[1].position.x).toEqual(1);
        expect(fields[1].position.y).toEqual(0);

        expect(fields[2].position.x).toEqual(0);
        expect(fields[2].position.y).toEqual(1);

        expect(fields[3].position.x).toEqual(1);
        expect(fields[3].position.y).toEqual(1);
    });

    test('should ', () => {
        //
    });
});
