import { Position } from './position.interface';

export interface FieldModel {
    hasMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    position: Position;
    numberOfMineNeighbors: number;
}
