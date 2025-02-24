import PropTypes from 'prop-types'
import { useBoardStore } from '@stores/board'
import './box.scss'


const Box = ({ index }) => {
    const board = useBoardStore((state) => state.board);
    const boxStyles = useBoardStore((state) => state.boxStyles);
    const gameOn = useBoardStore((state) => state.gameOn);
    const currPlayer = useBoardStore((state) => state.currentPlayer);

    const mutateBoard = useBoardStore((state) => state.setBoard);

    
    const retrieveBoxStyles = () => boxStyles[index] ?? ''
    const checkBoardEmpty = () => board[index] === '';


    const handleClick = () => {
        // CHECK IF BOX HAS ALREADY BEEN PRESSED
        // CHECK IF GAME IS OVER
        if (checkBoardEmpty() && gameOn) mutateBoard(index, currPlayer);
        
    }

    return (
        <div className={`box ${retrieveBoxStyles()}`} onClick={handleClick}>
            <span>
                {board[index]}
            </span>
        </div>
    )
}

Box.propTypes = {
    index: PropTypes.number
}

export default Box