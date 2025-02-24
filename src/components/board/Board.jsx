import { useEffect } from 'react';
import { useBoardStore } from '@stores/board'

import { getWinCombs, isBoardEmpty, isBoardFilled, boxStylesOnWin } from '@services/services'

import Box from '@components/box/box'
import Dashboard from '@components/dashboard/Dashboard';
import Message from '@components/message/Message';
import Reset from '@components/reset/Reset';
import './board.scss'

const Board = () => {
    const board = useBoardStore((state) => state.board);
    const boardStyles = useBoardStore((state) => state.boxStyles);
    const currPlayer = useBoardStore((state) => state.currentPlayer);
    const mutateCurrentPlayer = useBoardStore((state) => state.setCurrentPlayer);
    const mutateBoardStylesOnWin = useBoardStore((state) => state.setBoardStyles);
    const mutateScore = useBoardStore((state) => state.setScore)
    const mutateGamePlay = useBoardStore((state) => state.setGamePlay);

    useEffect(() => {
        // CHECK IF THERE IS A WINNER
        if (!isBoardEmpty(board)) {
            const { isWinner, winningNumbers } = getWinCombs(board, currPlayer);
            if (!isWinner) mutateCurrentPlayer();
    
            if (isWinner || isBoardFilled(board)) {
                mutateGamePlay(false);
    
                if (isWinner) {
                    mutateBoardStylesOnWin(boxStylesOnWin(boardStyles, winningNumbers));
                    mutateScore(currPlayer);
                }
            }
        }
    }, [board])

    return (
        <>
            <Dashboard />
            <div className="board">
                { board && board.map( (el, index) => <Box key={index} index={index} /> )}
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