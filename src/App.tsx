import React, {useEffect, useState} from 'react';
import './App.css';
import {Board} from "./models/Board";
import BoardComponents from "./components/BoardComponents";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";


const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    useEffect(() => {
        restartGame()
    }, [])

    function restartGame () {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setCurrentPlayer(whitePlayer)
        setBoard(newBoard)
    }
    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div className='app'>
            <LostFigures
                figures={board.lostBlackFigures}
            />
            <BoardComponents
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <LostFigures
                figures={board.lostWhiteFigures}
            />
            <Timer
                currentPlayer={currentPlayer}
                restart={restartGame}
            />
        </div>
    );
};

export default App;