import {Colors} from "../Colors";
import logo from '../../assets/black-bishop.png'
import {Cell} from "../Cell";
import {Board} from "../Board";

export enum FigureName {
    FIGURE = 'Фигура',
    KING = 'Король',
    KNIGHT = 'Конь',
    PAWN = 'Пешка',
    QUEEN = 'Королева',
    ROOK = 'Ладья',
    BISHOP = 'Слон',
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureName;
    id: number;


    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureName.FIGURE;
        this.id = Math.random();
    }

    canMove(target: Cell) : boolean {
        return true
    }
    moveFigure(target: Cell) {
    }
}