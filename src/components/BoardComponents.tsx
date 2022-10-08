import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponents: FC<BoardProps> = ({board, setBoard, swapPlayer, currentPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function selectCell(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            setSelectedCell(null)
            swapPlayer()
        } else if (!cell.figure) {
            setSelectedCell(null)
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
            }
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div className='board-wrap'>
            <div className='textBoxCurrentPlayer'>
                <h2>Ходит:
                    <span
                        style={{
                            color: currentPlayer?.color === Colors.WHITE ? 'white' : 'black',
                            marginLeft: 5
                    }}>
                        {currentPlayer?.color === Colors.WHITE ? 'Белый' : 'Черный'}
                    </span>
                </h2>
            </div>
            <div className='board'>
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent
                                selectCell={selectCell}
                                key={cell.id}
                                cell={cell}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponents;