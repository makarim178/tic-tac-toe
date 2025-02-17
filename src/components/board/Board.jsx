import { useEffect } from 'react';
import { useBoardStore } from '@stores/board'

import Box from '@components/box/box'
import Dashboard from '@components/dashboard/Dashboard';
import Message from '@components/message/Message';
import Reset from '@components/reset/Reset';
import './board.scss'

const Board = () => {
    const board = useBoardStore((state) => state.board);
    const mutateGamePlay = useBoardStore((state) => state.setGamePlay);

    useEffect(() => {
        if (!board.filter(box => box === '').length) {
            mutateGamePlay(false);
        }
    }, [board, mutateGamePlay])

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