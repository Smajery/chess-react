import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    setCurrentPlayer: (currentPlayer: Player | null) => void;
    restart: () => void;
    whitePlayer: Player;
    isStart: boolean;
    setIsStart: (isStart: boolean) => void
}

const Timer: FC<TimerProps> = ({currentPlayer, restart, setCurrentPlayer, whitePlayer, isStart, setIsStart}) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        if (isStart) {
            startTimer()
        }
    }, [currentPlayer])

    function startTimer() {
        if (!isStart){
            return false
        }
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    const handleStart = () => {
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }
    if (whiteTime < 0) {
        alert('Белые проиграли')
        setIsStart(false)
        handleStart()
    }
    if (blackTime < 0) {
        alert('Черные проиграли')
        setIsStart(false)
        handleStart()
    }

    function startGame() {
        setCurrentPlayer(whitePlayer)
        setIsStart(true)
    }

    return (
        <div className='timer'>
            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
            {isStart
                ?
                <button className='timerRestart' onClick={handleStart}>Restart</button>
                :
                <button className='timerRestart' onClick={startGame}>Start</button>
            }
        </div>
    );
};

export default Timer;