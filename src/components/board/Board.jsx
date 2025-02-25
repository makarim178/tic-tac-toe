import { useEffect } from 'react';
import { useBoardStore } from '@stores/board'

import {
    getBotMove,
    getWinCombs,
    isBoardEmpty,
    isBoardFilled,
    boxStylesOnWin
} from '@services/services'

import Box from '@components/box/box'
import Dashboard from '@components/dashboard/Dashboard';
import Message from '@components/message/Message';
import Reset from '@components/reset/Reset';
import { PLAYERS, STYLENAMES } from '../../shared/constants';
import './board.scss'

const Board = () => {
    const board = useBoardStore((state) => state.board);
    const boardStyles = useBoardStore((state) => state.boxStyles);
    const botTurn = useBoardStore((state) => state.botTurn);
    const mutateCurrentPlayer = useBoardStore((state) => state.setCurrentPlayer);
    const mutateBoardStylesOnWin = useBoardStore((state) => state.setBoardStyles);
    const mutateScore = useBoardStore((state) => state.setScore)
    const mutateGamePlay = useBoardStore((state) => state.setGamePlay);
    const lastMove = useBoardStore((state) => state.playerLastMoveIndex);

    const mutateBoard = useBoardStore((state) => state.setBoard);
    const mutateCell = useBoardStore((state) => state.setBoxStyles);

    useEffect(() => {
        // CHECK IF THERE IS A WINNER
        // console.log(board);
        if (!isBoardEmpty(board)) {
            let winningNumbers = [];
            const playerWinner = getWinCombs(board, PLAYERS.X);
            const botWinner = getWinCombs(board, PLAYERS.O);
            
            let isWinner = playerWinner.isWinner || botWinner.isWinner;

            if (isWinner) {
                winningNumbers = playerWinner.isWinner ? playerWinner.winningNumbers : botWinner.winningNumbers;    
            }
            
            if (!isWinner && botTurn) {
                // TURN OF BOT
                setTimeout(() => {
                    const nextIndex = getBotMove(board, lastMove);
                    mutateBoard(nextIndex, PLAYERS.O);
                    mutateCell(nextIndex, `${STYLENAMES.BOT} ${STYLENAMES.NOT_ALLOWED}`);
                }, 500);

            }
    
            if (isWinner || isBoardFilled(board)) {
                mutateGamePlay(false);    
                if (isWinner) {
                    mutateBoardStylesOnWin(boxStylesOnWin(boardStyles, winningNumbers));
                    if(botWinner.isWinner) mutateCurrentPlayer();
                    mutateScore(playerWinner.isWinner ? PLAYERS.X : PLAYERS.O);
                }
            }
        }
    }, [board])

    return (
        <>
            <Dashboard />
            <div className="board-container">
                <div className="board">
                    { board && board.map( (el, index) => <Box key={index} index={index} /> )}
                </div>
            </div>
            <Message />
            <Reset />
            <div className="copy-right">
                <span>Copy-right by Mir Ashiful Karim</span>
            </div>
        </>
    )
}

export default Board;