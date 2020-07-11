import { Position } from './position.interface';

export interface FieldModel {
    hasMine: boolean;
    position: Position;
    numberOfMineNeighbors: number;
}
