import { Position } from './position.interface';

export interface FieldModel {
    hasMine: boolean;
    isRevealed: boolean;
    position: Position;
    numberOfMineNeighbors: number;
}
