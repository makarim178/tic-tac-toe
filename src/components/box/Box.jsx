import PropTypes from 'prop-types'
import { useBoardStore } from '@stores/board'
import './box.scss'


const Box = ({ index }) => {
    const board = useBoardStore((state) => state.board);
    const boxStyles = useBoardStore((state) => state.boxStyles);
    const gameOn = useBoardStore((state) => state.gameOn);
    const currPlayer = useBoardStore((state) => state.currentPlayer);
    const botTurn = useBoardStore((state) => state.botTurn);

    const mutateBoard = useBoardStore((state) => state.setBoard);
    const mutatePlayerMove = useBoardStore((state) => state.setPlayersLastMoveIndex);

    
    const retrieveBoxStyles = () => boxStyles[index] ?? ''
    const checkBoardEmpty = () => board[index] === '';


    const handleClick = () => {
        // CHECK IF BOX HAS ALREADY BEEN PRESSED
        // CHECK IF GAME IS OVER
        if (checkBoardEmpty() && gameOn) {
            mutatePlayerMove(index);
            mutateBoard(index, currPlayer);
        }  
    }

    return (
        <div className={`box ${retrieveBoxStyles()}`} style={{ pointerEvents: `${botTurn ? 'none' : ''}`}} onClick={handleClick}>
            { (botTurn && checkBoardEmpty()) && <div className="loader"></div> }
            { !(botTurn && checkBoardEmpty()) && <span>
                {board[index]}
            </span>}
        </div>
    )
}

Box.propTypes = {
    index: PropTypes.number
}

export default Box