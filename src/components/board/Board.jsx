import { useState } from 'react'
import {
    getWinCombs,
    listClassNames
} from '@services/services.js'
import {
    PLAYERS,
    BOARD_REF,
    WINNING_COUNT_REF,
    SELECTED_BOXES_PLYER_REF
} from '@shared/constants'
import Player from '@components/player/player'
import Box from '@components/box/box'
import './board.scss'

const Board = () => {
    const [currPlayer, setCurrPlayer] = useState(PLAYERS.X);
    const [board, setBoard] = useState(BOARD_REF);
    const [selectedBoxesByPlayer, setSelectedBoxesByPlayer] = useState(SELECTED_BOXES_PLYER_REF);
    const [countFilled, setCountFilled] = useState(0);
    const [winningCount, setWinningCount] = useState(WINNING_COUNT_REF);
    const [winner, setWinner] = useState('')

    const updateBoard = (origin, classNames) => setBoard({ ...board, [origin]: {...board[origin], player: currPlayer, className: listClassNames(board[origin].className, classNames)}});
        
    const updateBoardByWin = ({isWinner, winningNumbers}) => { 
        if (isWinner) {
            setWinner(currPlayer);
            const winningObjects = winningNumbers.reduce((acc, num) => {
                acc[`box-0${num}`] = {
                    player: currPlayer,
                    className: ['box-wins not-allowed']
                }
                return acc
            }, {});
            setBoard({ ...board, ...winningObjects});
            setCountFilled(9);
            setWinningCount({...winningCount, [currPlayer]: winningCount[currPlayer] + 1})
        } 
     }

    const handleClick = origin => {
        if (!board[origin].player && countFilled < 9) {
            setCountFilled(countFilled + 1);
            updateBoard(origin, ['box-bg','not-allowed']);
            const selectedBoxListByPlayer = [...selectedBoxesByPlayer[currPlayer], origin.slice(-1)].sort(); 
        
            setSelectedBoxesByPlayer({ ...selectedBoxesByPlayer, [currPlayer]: selectedBoxListByPlayer})
            
            updateBoardByWin(getWinCombs(selectedBoxListByPlayer));

            setCurrPlayer(currPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X)
        }
    }

    const resetBoard = () => {
        setBoard(Object.keys(board).reduce((acc, key) => {
            acc[key] = {
                player: '',
                className: []
            };
            return acc;
        }, {}))
    }

    const handleReset = () => {
        resetBoard();
        setCountFilled(0);
        setSelectedBoxesByPlayer(SELECTED_BOXES_PLYER_REF);
        setCurrPlayer(PLAYERS.X);
        setWinner('');
    }

    const getWinnerBadge = () => {
        if (!winner) return `Draw! Better luck next time!`;            
        return `Congratulations! Player ${winner} Wins!`;
    }

    const resetPlayers = () => {
        setWinningCount({ X: 0, O: 0});
        resetBoard();
    };

    return (
        <>
            <div className="dashboard">
                { Object.keys(PLAYERS).map( player => (<Player key={player} playerName={player} winCount={winningCount[player]} isTurn={currPlayer === player} />))}
            </div>
            <div className="board">
                { Object.keys(board).map( key => (
                    <Box key={key} name={key} content={board[key].player} classNames={board[key].className} handleClick={handleClick}/>
                ))}
            </div>
            <div className="main-reset-container">
                <button className='btn-reset' onClick={resetPlayers}>Reset Players</button>
                <button className='btn-reset' onClick={handleReset}>Reset Game</button>
            </div>
            { countFilled > 8 && <div className="blur-container">
                <div className="reset-container">
                    <h3>
                       {getWinnerBadge()}
                    </h3>
                    <button className='btn-reset' onClick={handleReset}>New Game</button>
                </div>
            </div>
            }
            <div className="copy-right">
                <span>Copy-right by Mir Ashiful Karim</span>
            </div>
        </>
    )
}

export default Board;