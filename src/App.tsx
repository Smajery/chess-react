import React, {useEffect, useState} from 'react';
import './App.css';
import {Board} from "./models/Board";
import BoardComponents from "./components/BoardComponents";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";


const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    useEffect(() => {
        restartGame()
        setCurrentPlayer(whitePlayer)
    }, [])

    function restartGame () {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }
    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div className='app'>
            <BoardComponents
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
        </div>
    );
};

export default App;