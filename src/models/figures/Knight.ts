import {Figure, FigureName} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-knight.png";
import whiteLogo from "../../assets/white-knight.png";

export class Knight extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureName.KNIGHT;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target))
            return false
        const dX = Math.abs(this.cell.x - target.x)
        const dY = Math.abs(this.cell.y - target.y)

        if((dX === 1 && dY === 2) || (dX === 2 && dY === 1))
            return true
        return false
    }
}